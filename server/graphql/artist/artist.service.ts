import { Injectable } from '@nestjs/common';
import { CtxType } from '@/types/ctx.type';
import { PrismaService } from '@/common/services/prisma.service';
import { ArtistModel } from '@/types/models/artist.model';
import { TrackModel } from '@/types/models/track.model';
import { NotFoundException } from '@nestjs/common/exceptions';

@Injectable()
export class ArtistService {
  constructor(private readonly prisma: PrismaService) {}

  async find(artist_id: number, ctx: CtxType): Promise<ArtistModel> {
    try {
      return (await this.prisma.artist.findUnique({
        select: { id: true, name: true },
        where: { id: artist_id },
      })) as ArtistModel;
    } catch (e) {
      throw new NotFoundException('Artist not found', { cause: e });
    }
  }

  async find_all(ctx: CtxType): Promise<ArtistModel[]> {
    return (await this.prisma.artist.findMany({
      select: { id: true, name: true },
      where: { server_id: ctx.server_id },
      orderBy: { name: 'asc' },
    })) as ArtistModel[];
  }

  async find_tracks(artist_id: number, ctx: CtxType): Promise<TrackModel[]> {
    return (await this.prisma.track.findMany({
      select: { id: true, title: true },
      where: { artist_id: artist_id },
      orderBy: { title: 'asc' },
    })) as TrackModel[];
  }
}
