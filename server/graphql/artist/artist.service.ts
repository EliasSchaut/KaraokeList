import { Injectable } from '@nestjs/common';
import { CtxType } from '@/types/ctx.type';
import { PrismaService } from '@/common/db/prisma.service';
import { ArtistModel } from '@/types/models/artist.model';
import { TrackModel } from '@/types/models/track.model';

@Injectable()
export class ArtistService {
  constructor(private readonly prisma: PrismaService) {}

  async find_artist_all(ctx: CtxType): Promise<ArtistModel[]> {
    return (await this.prisma.artist.findMany({
      select: { id: true, name: true },
      where: { server_id: ctx.server_id },
      orderBy: { name: 'asc' },
    })) as ArtistModel[];
  }

  async find_tracks_of_artist(
    artist_id: number,
    ctx: CtxType,
  ): Promise<TrackModel[]> {
    return (
      await this.prisma.trackArtists.findMany({
        select: { track: { select: { id: true, title: true } } },
        where: { artist_id: artist_id },
        orderBy: { track: { title: 'asc' } },
      })
    )?.map((artist_track) => {
      return artist_track.track;
    }) as TrackModel[];
  }
}
