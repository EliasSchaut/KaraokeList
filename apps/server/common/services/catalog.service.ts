import { Injectable } from '@nestjs/common';
import { TrackModel } from '@/types/models/track.model';
import { PrismaService } from 'nestjs-prisma';
import { TrackInputModel } from '@/types/models/inputs/track.input';
import { InjectMeiliSearch } from 'nestjs-meilisearch';
import { MeiliSearch } from 'meilisearch';
import { Artist } from '@prisma/client';
import { PrismaException } from '@/common/exceptions/prisma.exception';

@Injectable()
export class CatalogService {
  private readonly INDEX_NAME = 'tracks';

  constructor(
    private readonly prisma: PrismaService,
    @InjectMeiliSearch() private readonly meili: MeiliSearch,
  ) {}

  async query(query_string: string): Promise<TrackModel[]> {
    const result = await this.meili
      .index(this.INDEX_NAME)
      .search(query_string, { limit: 10 });
    if (result) {
      return result.hits.map((hit) => new TrackModel(hit));
    }
  }

  async add_track(track_input: TrackInputModel): Promise<boolean> {
    return this.prisma.track
      .create({
        data: this.generate_track_create_data(track_input),
        include: { artist: true, language: true, genre: true },
      })
      .then(async (track) => {
        return await this.index_tracks([new TrackModel(track)]);
      })
      .catch(() => false);
  }

  async add_multiple_tracks(tracks: TrackInputModel[]): Promise<boolean> {
    const artists = this.reduce_tracks_to_artists(tracks);

    const create_track_promises = [];
    for (const artist_name of Object.keys(artists)) {
      create_track_promises.push(async () => {
        const artist: Artist = await this.prisma.artist.upsert({
          where: { name: artist_name },
          create: { name: artist_name },
          update: {},
        });

        const track_data = artists[artist_name].map((track_title) => {
          return {
            title: track_title,
            artist_id: artist.id,
          };
        });

        return this.prisma.track.createMany({
          data: track_data,
          skipDuplicates: true,
        });
      });
    }

    // Execute the promises in chunks to avoid overwhelming the connection pool
    const chunk_size = 100;
    for (let i = 0; i < create_track_promises.length; i += chunk_size) {
      const chunk = create_track_promises
        .slice(i, i + chunk_size)
        .map((fn) => fn());
      await Promise.all(chunk).catch((e) => {
        throw new PrismaException(e);
      });
    }

    return true;
  }

  async clear(): Promise<boolean> {
    return this.prisma.track
      .deleteMany()
      .then(async () => {
        return await this.clear_index();
      })
      .catch(() => false);
  }

  private async index_tracks(tracks: TrackModel[]): Promise<boolean> {
    return this.meili
      .index(this.INDEX_NAME)
      .addDocuments(tracks, { primaryKey: 'id' })
      .then(() => true)
      .catch(() => false);
  }

  private async clear_index(): Promise<boolean> {
    return this.meili
      .index(this.INDEX_NAME)
      .deleteAllDocuments()
      .then(() => true)
      .catch(() => false);
  }

  private generate_track_create_data(track: TrackInputModel) {
    return {
      title: track.title,
      artist: this.connect_or_create_if_present(track.artist),
      genre: this.connect_or_create_if_present(track.genre),
      language: this.connect_or_create_if_present(track.language),
      edition: track?.edition,
      year: track?.year,
      tags: track?.tags,
      cover_url: track?.cover_url,
      audio_url: track?.audio_url,
      video_url: track?.video_url,
      duet: track?.duet,
    };
  }

  private connect_or_create_if_present(field: any) {
    if (!field) return {};

    return {
      connectOrCreate: {
        where: {
          name: field,
        },
        create: {
          name: field,
        },
      },
    };
  }

  private reduce_tracks_to_artists(tracks: TrackInputModel[]): {
    [key: string]: string[];
  } {
    return tracks.reduce((acc: { [key: string]: string[] }, track) => {
      if (!acc[track.artist]) {
        acc[track.artist] = [];
      }
      acc[track.artist].push(track.title);
      return acc;
    }, {});
  }
}
