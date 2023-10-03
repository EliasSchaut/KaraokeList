import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/services/prisma.service';
import { CtxType } from '@/types/ctx.type';
import { ReportModel } from '@/types/models/report.model';
import { ReportInputModel } from '@/types/models/inputs/report.input';
import { TrackModel } from '@/types/models/track.model';
import { NotFoundException } from '@nestjs/common/exceptions';

@Injectable()
export class ReportService {
  constructor(private readonly prisma: PrismaService) {}

  async create(report: ReportInputModel, ctx: CtxType): Promise<ReportModel> {
    return (await this.prisma.report.create({
      data: {
        server_id: ctx.server_id,
        track_id: report.track_id,
        desc: report.desc,
      },
    })) as ReportModel;
  }

  async find_all(ctx: CtxType): Promise<ReportModel[]> {
    return (await this.prisma.report.findMany({
      where: {
        server_id: ctx.server_id,
      },
    })) as ReportModel[];
  }

  async find_track(report_id: number, ctx: CtxType): Promise<TrackModel> {
    try {
      return (await this.prisma.report.findUnique({
        where: {
          id: report_id,
        },
        select: {
          track: true,
        },
      }))!.track as TrackModel;
    } catch (e) {
      throw new NotFoundException(`Report not found`, { cause: e });
    }
  }
}
