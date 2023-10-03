import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/services/prisma.service';
import { CtxType } from '@/types/ctx.type';
import { RequestModel } from '@/types/models/request.model';
import { TrackInputModel } from '@/types/models/inputs/track.input';
import {
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common/exceptions';
import { Prisma } from '@prisma/client';

@Injectable()
export class RequestService {
  constructor(private readonly prisma: PrismaService) {}

  async create(request: TrackInputModel, ctx: CtxType): Promise<RequestModel> {
    try {
      return (await this.prisma.request.create({
        data: {
          server_id: ctx.server_id,
          track_title: request.track_title,
          artist_name: request.artist_name,
        },
      })) as RequestModel;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new ConflictException(
            `Request '${request.artist_name} - ${request.track_title}' already exists`,
            { cause: e },
          );
        }
      }
      throw new InternalServerErrorException('Database error', { cause: e });
    }
  }

  async find_all(ctx: CtxType): Promise<RequestModel[]> {
    return (await this.prisma.request.findMany({
      where: {
        server_id: ctx.server_id,
      },
    })) as RequestModel[];
  }

  async delete(report_id: number, ctx: CtxType): Promise<RequestModel> {
    try {
      return (await this.prisma.request.delete({
        where: {
          id: report_id,
          server_id: ctx.server_id,
        },
      })) as RequestModel;
    } catch (e) {
      throw new NotFoundException(`Request not found`, { cause: e });
    }
  }
}
