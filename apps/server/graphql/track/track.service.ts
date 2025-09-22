import { Injectable } from '@nestjs/common';
import { CtxType } from '@/types/common/ctx.type';
import { TrackModel } from '@/types/models/track.model';
import { TrackMetadataModel } from '@/types/models/track_metadata.model';
import { PrismaService } from 'nestjs-prisma';
import { PrismaException } from '@/common/exceptions/prisma.exception';
import { MusicApiService } from '@/common/services/music_api/music_api.service';
import { SearchInputModel } from '@/types/models/inputs/query.input';
import { CursorInputModel } from '@/types/models/inputs/cursor.input';
import { CountModel } from '@/types/models/count.model';
import { Prisma } from '@prisma/client';

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
}
