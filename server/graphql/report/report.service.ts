import { Injectable } from '@nestjs/common';
import { CtxType } from '@/types/common/ctx.type';
import { ReportModel } from '@/types/models/report.model';
import { ReportInputModel } from '@/types/models/inputs/report.input';
import { TrackModel } from '@/types/models/track.model';
import { PrismaService } from 'nestjs-prisma';
import { WarningException } from '@/common/exceptions/warning.exception';
import { PrismaException } from '@/common/exceptions/prisma.exception';

@Injectable()
export class ReportService {
  constructor(private readonly prisma: PrismaService) {}

  async find_many(ctx: CtxType): Promise<ReportModel[]> {
    return this.prisma.report.findMany();
  }

  async create(
    report_input: ReportInputModel,
    ctx: CtxType,
  ): Promise<ReportModel> {
    const report = await this.prisma.report.create({
      data: {
        track_id: report_input.track_id,
        desc: report_input.desc,
      },
    });
    return new ReportModel(report);
  }

  async delete(report_id: number, ctx: CtxType): Promise<ReportModel> {
    const report = await this.prisma.report
      .delete({
        where: {
          id: report_id,
        },
      })
      .catch((e) => {
        throw new PrismaException(e, {
          record_does_not_exist: ctx.i18n.t('exceptions.not_found.report'),
        });
      });
    return new ReportModel(report);
  }

  async resolve_track(report_id: number, ctx: CtxType): Promise<TrackModel> {
    const report = await this.prisma.report.findUnique({
      where: {
        id: report_id,
      },
      include: {
        track: {
          include: {
            artist: true,
          },
        },
      },
    });
    if (!report) {
      throw new WarningException(ctx.i18n.t('exceptions.not_found.report'));
    }
    return new TrackModel(report.track);
  }
}
