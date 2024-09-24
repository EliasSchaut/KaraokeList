import { Injectable } from '@nestjs/common';
import { CtxType } from '@/types/common/ctx.type';
import { ArtistModel } from '@/types/models/artist.model';
import { TrackModel } from '@/types/models/track.model';
import { TrackMetadataModel } from '@/types/models/track_metadata.model';
import { TrackInputModel } from '@/types/models/inputs/track.input';
import { PrismaService } from 'nestjs-prisma';
import { PrismaException } from '@/common/exceptions/prisma.exception';
import { MusicApiService } from '@/common/services/music_api/music_api.service';
import { WarningException } from '@/common/exceptions/warning.exception';

@Injectable()
export class TrackService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly music_api: MusicApiService,
  ) {}

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

  async find_many(ctx: CtxType): Promise<TrackModel[]> {
    return this.prisma.track.findMany({
      select: {
        id: true,
        title: true,
      },
      orderBy: { title: 'asc' },
    });
  }

  async find_by_id(track_id: number, ctx: CtxType): Promise<TrackModel> {
    const track = await this.prisma.track.findUnique({
      where: { id: track_id },
    });
    if (!track) {
      throw new WarningException(ctx.i18n.t('exceptions.not_found.track'));
    }
    return new TrackModel(track);
  }

  async resolve_artist(track_id: number, ctx: CtxType): Promise<ArtistModel> {
    const track = await this.prisma.track.findUnique({
      where: { id: track_id },
      select: { artist: { select: { id: true, name: true } } },
    });
    if (!track) {
      throw new WarningException(ctx.i18n.t('exceptions.not_found.artist'));
    }
    return new ArtistModel(track.artist);
  }

  async is_reported(track_id: number, ctx: CtxType): Promise<Boolean> {
    const first_report = await this.prisma.report.findFirst({
      where: { track_id: track_id },
    });
    return !!first_report;
  }

  async find_metadata(
    track_id: number,
    ctx: CtxType,
  ): Promise<TrackMetadataModel> {
    const track = await this.find_by_id(track_id, ctx);
    const artist = await this.resolve_artist(track_id, ctx);
    const metadata = await this.music_api.find_track(track!.title, artist.name);
    if (!metadata) return {};
    else return new TrackMetadataModel(metadata);
  }

  async delete(track_id: number, ctx: CtxType): Promise<TrackModel> {
    const track = await this.prisma.track
      .delete({
        where: { id: track_id },
      })
      .catch((e) => {
        throw new PrismaException(e, {
          record_does_not_exist: ctx.i18n.t('exceptions.not_found.track'),
        });
      });
    return new TrackModel(track);
  }
}
