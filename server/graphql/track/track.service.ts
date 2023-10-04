import { Injectable } from '@nestjs/common';
import { CtxType } from '@/types/ctx.type';
import { PrismaService } from '@/common/services/prisma.service';
import { ArtistModel } from '@/types/models/artist.model';
import { TrackModel } from '@/types/models/track.model';
import { TrackMetadataModel } from '@/types/models/track_metadata.model';
import { SpotifyService } from '@/common/services/spotify.service';
import { TrackInputModel } from '@/types/models/inputs/track.input';
import {
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common/exceptions';
import { Prisma } from '@prisma/client';

@Injectable()
export class TrackService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly spotify: SpotifyService,
  ) {}

  private generate_track_create_data(track: TrackInputModel, ctx: CtxType) {
    return {
      server: { connect: { id: ctx.server_id } },
      title: track.track_title,
      artist: {
        connectOrCreate: {
          where: {
            server_id_name: {
              server_id: ctx.server_id,
              name: track.artist_name,
            },
          },
          create: {
            name: track.artist_name,
            server: { connect: { id: ctx.server_id } },
          },
        },
      },
    };
  }

  async create(track: TrackInputModel, ctx: CtxType): Promise<TrackModel> {
    try {
      return (await this.prisma.track.create({
        data: this.generate_track_create_data(track, ctx),
        include: { artist: true },
      })) as TrackModel;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new ConflictException(
            `Track '${track.artist_name} - ${track.track_title}' already exists`,
            { cause: e },
          );
        }
      }
      throw new InternalServerErrorException('Database error', { cause: e });
    }
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

  async find_all(ctx: CtxType): Promise<TrackModel[]> {
    return (await this.prisma.track.findMany({
      select: {
        id: true,
        title: true,
      },
      where: { server_id: ctx.server_id },
      orderBy: { title: 'asc' },
    })) as TrackModel[];
  }

  async find(track_id: number, ctx: CtxType): Promise<TrackModel> {
    try {
      return (await this.prisma.track.findUnique({
        select: {
          id: true,
          title: true,
        },
        where: { id: track_id },
      })) as TrackModel;
    } catch (e) {
      throw new NotFoundException('Track not found', { cause: e });
    }
  }

  async find_artist(track_id: number, ctx: CtxType): Promise<ArtistModel> {
    try {
      return (await this.prisma.track.findUnique({
        where: { id: track_id },
        select: { artist: { select: { id: true, name: true } } },
      }))!.artist as ArtistModel;
    } catch (e) {
      throw new NotFoundException('Artist not found', { cause: e });
    }
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
    const artist = await this.find_artist(track_id, ctx);
    const metadata = await this.spotify.find_track(track!.title, artist.name);
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

  async delete(track_id: number, ctx: CtxType): Promise<TrackModel> {
    try {
      return (await this.prisma.track.delete({
        where: { id: track_id },
      })) as TrackModel;
    } catch (e) {
      throw new NotFoundException('Track not found', { cause: e });
    }
  }
}
