import { Injectable } from '@nestjs/common';
import { CtxType } from '@/types/common/ctx.type';
import { TrackModel } from '@/types/models/track.model';
import { TrackMetadataModel } from '@/types/models/track_metadata.model';
import { TrackInputModel } from '@/types/models/inputs/track.input';
import { PrismaService } from 'nestjs-prisma';
import { PrismaException } from '@/common/exceptions/prisma.exception';
import { MusicApiService } from '@/common/services/music_api/music_api.service';
import { SearchInputModel } from '@/types/models/inputs/search.input';
import { CursorInputModel } from '@/types/models/inputs/cursor.input';
import { CountModel } from '@/types/models/count.model';
import { Artist, Prisma } from '@prisma/client';

@Injectable()
export class TrackService {
  private readonly DEFAULT_PAGE_SIZE = Number(process.env.TABLE_PAGE_SIZE);

  constructor(
    private readonly prisma: PrismaService,
    private readonly music_api: MusicApiService,
  ) {}

  async search(
    search_query: SearchInputModel,
    ctx: CtxType,
  ): Promise<TrackModel[]> {
    const queries: Prisma.TrackWhereInput[] = [];
    if (search_query.track_title.length > 0) {
      queries.push({
        title: { contains: search_query.track_title, mode: 'insensitive' },
      });
    }
    if (search_query.artist_name.length > 0) {
      queries.push({
        artist: {
          name: { contains: search_query.artist_name, mode: 'insensitive' },
        },
      });
    }
    if (queries.length === 0) return [];

    return this.prisma.track.findMany({
      select: {
        id: true,
        title: true,
        artist: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      where: {
        AND: queries,
      },
      orderBy: { title: 'asc' },
      take: Number(process.env.TABLE_PAGE_SIZE),
    });
  }

  async find_many(cursor?: CursorInputModel): Promise<TrackModel[]> {
    return this.prisma.track.findMany({
      include: { artist: true },
      orderBy: { title: 'asc' },
      take: cursor?.first,
      skip: cursor?.after ? 1 : 0,
      cursor: cursor?.after ? { id: cursor?.after } : undefined,
    });
  }

  async find_by_id(track_id: number, ctx: CtxType): Promise<TrackModel | null> {
    return this.prisma.track.findUnique({
      where: { id: track_id },
      include: { artist: true },
    });
  }

  async count(page_size?: number): Promise<CountModel> {
    const count = await this.prisma.track.count();
    return {
      count: count,
      total_pages: Math.ceil(count / (page_size ?? this.DEFAULT_PAGE_SIZE)),
    };
  }

  async create(
    track_input: TrackInputModel,
    ctx: CtxType,
  ): Promise<TrackModel> {
    const track = await this.prisma.track
      .create({
        data: this.generate_track_create_data(track_input, ctx),
        include: { artist: true },
      })
      .catch((e) => {
        throw new PrismaException(e, {
          unique_constraint_violation: ctx.i18n.t(
            'exceptions.already_exists.track',
          ),
        });
      });
    return new TrackModel(track);
  }

  async create_many(tracks: TrackInputModel[], ctx: CtxType): Promise<boolean> {
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

  async resolve_is_reported(track_id: number): Promise<Boolean> {
    const first_report = await this.prisma.report.findFirst({
      where: { track_id: track_id },
    });
    return !!first_report;
  }

  async resolve_metadata(
    track_title: string,
    artist_name: string,
  ): Promise<TrackMetadataModel> {
    const metadata = await this.music_api.find_track(track_title, artist_name);
    if (metadata === null) return {};
    return metadata;
  }

  async delete(track_id: number, ctx: CtxType): Promise<TrackModel> {
    const track = await this.prisma.track
      .delete({
        where: { id: track_id },
        include: { artist: true },
      })
      .catch((e) => {
        throw new PrismaException(e, {
          record_does_not_exist: ctx.i18n.t('exceptions.not_found.track'),
        });
      });
    return new TrackModel(track);
  }

  private reduce_tracks_to_artists(tracks: TrackInputModel[]): {
    [key: string]: string[];
  } {
    return tracks.reduce((acc: { [key: string]: string[] }, track) => {
      if (!acc[track.artist_name]) {
        acc[track.artist_name] = [];
      }
      acc[track.artist_name].push(track.track_title);
      return acc;
    }, {});
  }

  private generate_track_create_data(track: TrackInputModel, ctx: CtxType) {
    return {
      title: track.track_title,
      artist: {
        connectOrCreate: {
          where: {
            name: track.artist_name,
          },
          create: {
            name: track.artist_name,
          },
        },
      },
    };
  }
}
