import { Injectable } from '@nestjs/common';
import { CtxType } from '@/types/ctx.type';
import { PrismaService } from '@/common/db/prisma.service';
import { ArtistModel } from '@/types/models/artist.model';
import { TrackModel } from '@/types/models/track.model';
import { TrackMetadataModel } from '@/types/models/track_metadata.model';
import { SpotifyService } from '@/common/util/spotify.service';

@Injectable()
export class TrackService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly spotify: SpotifyService,
  ) {}

  async find_track_all(ctx: CtxType): Promise<TrackModel[]> {
    return (await this.prisma.track.findMany({
      select: {
        id: true,
        title: true,
      },
      where: { server_id: ctx.server_id },
      orderBy: { title: 'asc' },
    })) as TrackModel[];
  }

  async find_track(track_id: number, ctx: CtxType): Promise<TrackModel> {
    return (await this.prisma.track.findUnique({
      select: {
        id: true,
        title: true,
      },
      where: { id: track_id, server_id: ctx.server_id },
    })) as TrackModel;
  }

  async find_artists_of_track(
    track_id: number,
    ctx: CtxType,
  ): Promise<ArtistModel[]> {
    return (
      await this.prisma.trackArtists.findMany({
        where: { track_id: track_id },
        select: { artist: { select: { id: true, name: true } } },
      })
    ).map((track_artist) => {
      return track_artist.artist;
    }) as ArtistModel[];
  }

  async find_artists_names_of_track(
    track_id: number,
    ctx: CtxType,
  ): Promise<string> {
    return (await this.find_artists_of_track(track_id, ctx))
      .map((artist) => {
        return artist.name;
      })
      .join(' x ');
  }

  async is_reported(track_id: number, ctx: CtxType): Promise<Boolean> {
    return (
      (await this.prisma.report.findFirst({
        where: { track_id: track_id },
      })) !== null
    );
  }

  async find_metadata(
    track_id: number,
    ctx: CtxType,
  ): Promise<TrackMetadataModel> {
    const track = await this.prisma.track.findUnique({
      select: { title: true },
      where: { id: track_id },
    });
    const artists = await this.find_artists_names_of_track(track_id, ctx);
    const metadata = await this.spotify.find_track(track!.title, artists);
    if (!metadata) return {};

    return {
      name: metadata.name,
      artists: metadata.artists?.map((artist) => artist.name).join(' x '),
      cover: metadata.album!.images![0].url,
      album: metadata.album!.name,
      duration: metadata.duration,
      explicit: metadata.explicit,
      release_date: metadata.album?.releaseDate,
      spotify_id: metadata.id,
      spotify_preview: metadata.previewURL,
      spotify_link: metadata.externalURL.spotify,
    };
  }
}
