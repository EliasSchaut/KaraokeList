import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/services/prisma.service';
import { CtxType } from '@/types/ctx.type';
import { ServerModel } from '@/types/models/server.model';
import { NotFoundException } from '@nestjs/common/exceptions';

@Injectable()
export class ServerService {
  constructor(private readonly prisma: PrismaService) {}

  async find_by_id({ server_id }: CtxType): Promise<ServerModel> {
    try {
      return (await this.prisma.server.findUnique({
        where: {
          id: server_id,
        },
        select: {
          id: true,
          title: true,
          name: true,
          desc: true,
        },
      })) as ServerModel;
    } catch (e) {
      throw new NotFoundException(`Server not found`, { cause: e });
    }
  }
}
