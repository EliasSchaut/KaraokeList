import { Injectable } from '@nestjs/common';
import { CtxType } from '@/types/ctx.type';
import { PrismaService } from '@/common/db/prisma.service';
import { ArtistModel } from '@/types/models/artist.model';
import { TrackModel } from '@/types/models/track.model';

@Injectable()
export class TrackService {
  constructor(private readonly prisma: PrismaService) {}

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
  ): Promise<String> {
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
}
