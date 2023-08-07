import { Injectable } from '@nestjs/common';
import { CtxType } from '@/types/ctx.type';
import { PrismaService } from '@/common/db/prisma.service';
import { ArtistModel } from '@/types/models/artist.model';
import { TrackModel } from '@/types/models/track.model';

@Injectable()
export class MediaService {
  constructor(private readonly prisma: PrismaService) {}

  async find_artist_all(ctx: CtxType): Promise<ArtistModel[]> {
    return await this.prisma.artist.findMany({
      select: { id: true, name: true },
      where: { server_id: ctx.server_id },
    });
  }

  async find_track_from_artist(
    artist_id: number,
    ctx: CtxType,
  ): Promise<TrackModel[]> {
    return this.prisma.track.findMany({
      select: { id: true, title: true },
      where: { server_id: ctx.server_id, artist_id: artist_id },
    });
  }

  async find_track_all(ctx: CtxType): Promise<TrackModel[]> {
    return this.prisma.track.findMany({
      select: { id: true, title: true },
      where: { server_id: ctx.server_id },
    });
  }
}
