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

@Injectable()
export class TrackService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly music_api: MusicApiService,
  ) {}

  async search(
    search_query: SearchInputModel,
    ctx: CtxType,
  ): Promise<TrackModel[]> {
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
        OR: [
          { title: { contains: search_query.track_title } },
          { artist: { name: { contains: search_query.artist_name } } },
        ],
      },
      orderBy: { title: 'asc' },
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

  async create_many(
    tracks: TrackInputModel[],
    ctx: CtxType,
  ): Promise<TrackModel[]> {
    const track_output: TrackModel[] = [];
    for (const track of tracks) {
      track_output.push(await this.create(track, ctx));
    }
    return track_output;
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
    if (!metadata) return {};
    else return new TrackMetadataModel(metadata);
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
