import { Injectable } from '@nestjs/common';
import { CtxType } from '@/types/common/ctx.type';
import { PrismaService } from 'nestjs-prisma';
import { ArtistModel } from '@/types/models/artist.model';
import { TrackModel } from '@/types/models/track.model';
import { WarningException } from '@/common/exceptions/warning.exception';

@Injectable()
export class ArtistService {
  constructor(private readonly prisma: PrismaService) {}

  async find_by_id(artist_id: number, ctx: CtxType): Promise<ArtistModel> {
    const artist = await this.prisma.artist.findUnique({
      select: { id: true, name: true },
      where: { id: artist_id },
    });
    if (!artist) {
      throw new WarningException(ctx.i18n.t('exceptions.not_found.artist'));
    }
    return new ArtistModel(artist);
  }

  async find_many(ctx: CtxType): Promise<ArtistModel[]> {
    return this.prisma.artist.findMany({
      select: { id: true, name: true },
      orderBy: { name: 'asc' },
    });
  }

  async resolve_tracks(artist_id: number, ctx: CtxType): Promise<TrackModel[]> {
    return this.prisma.track.findMany({
      where: { artist_id: artist_id },
      include: { artist: true },
      orderBy: { title: 'asc' },
    });
  }
}
