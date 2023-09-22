import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/db/prisma.service';
import { CtxType } from '@/types/ctx.type';
import { RequestModel } from '@/types/models/request.model';
import { RequestInputModel } from '@/types/models/inputs/request.input';

@Injectable()
export class RequestService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    request: RequestInputModel,
    ctx: CtxType,
  ): Promise<RequestModel> {
    return (await this.prisma.request.create({
      data: {
        server_id: ctx.server_id,
        track_title: request.track_title,
        artist_name: request.artist_name,
      },
    })) as RequestModel;
  }

  async find_all(ctx: CtxType): Promise<RequestModel[]> {
    return (await this.prisma.request.findMany({
      where: {
        server_id: ctx.server_id,
      },
    })) as RequestModel[];
  }

  async delete(report_id: number, ctx: CtxType): Promise<RequestModel> {
    return (await this.prisma.request.delete({
      where: {
        id: report_id,
        server_id: ctx.server_id,
      },
    })) as RequestModel;
  }
}
