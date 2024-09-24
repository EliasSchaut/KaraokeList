import { Injectable } from '@nestjs/common';
import { CtxType } from '@/types/common/ctx.type';
import { RequestModel } from '@/types/models/request.model';
import { TrackInputModel } from '@/types/models/inputs/track.input';
import { PrismaService } from 'nestjs-prisma';
import { PrismaException } from '@/common/exceptions/prisma.exception';

@Injectable()
export class RequestService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    request_input: TrackInputModel,
    ctx: CtxType,
  ): Promise<RequestModel> {
    const request = await this.prisma.request
      .create({
        data: {
          track_title: request_input.track_title,
          artist_name: request_input.artist_name,
        },
      })
      .catch((e) => {
        throw new PrismaException(e, {
          unique_constraint_violation: ctx.i18n.t(
            'exceptions.already_exists.request',
          ),
        });
      });
    return new RequestModel(request);
  }

  async find_many(ctx: CtxType): Promise<RequestModel[]> {
    return this.prisma.request.findMany();
  }

  async delete(report_id: number, ctx: CtxType): Promise<RequestModel> {
    const request = await this.prisma.request
      .delete({
        where: {
          id: report_id,
        },
      })
      .catch((e) => {
        throw new PrismaException(e, {
          record_does_not_exist: ctx.i18n.t('exceptions.not_found.request'),
        });
      });
    return new RequestModel(request);
  }
}
