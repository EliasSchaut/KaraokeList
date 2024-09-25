import { Injectable } from '@nestjs/common';
import { CtxType } from '@/types/common/ctx.type';
import { ReportModel } from '@/types/models/report.model';
import { ReportInputModel } from '@/types/models/inputs/report.input';
import { PrismaService } from 'nestjs-prisma';
import { PrismaException } from '@/common/exceptions/prisma.exception';

@Injectable()
export class ReportService {
  constructor(private readonly prisma: PrismaService) {}

  async find_many(ctx: CtxType): Promise<ReportModel[]> {
    return this.prisma.report.findMany({
      include: {
        track: { include: { artist: true } },
      },
    });
  }

  async create(
    report_input: ReportInputModel,
    ctx: CtxType,
  ): Promise<ReportModel> {
    return this.prisma.report.create({
      data: {
        track_id: report_input.track_id,
        desc: report_input.desc,
      },
      include: {
        track: { include: { artist: true } },
      },
    });
  }

  async delete(report_id: number, ctx: CtxType): Promise<ReportModel> {
    return this.prisma.report
      .delete({
        where: {
          id: report_id,
        },
        include: {
          track: { include: { artist: true } },
        },
      })
      .catch((e) => {
        throw new PrismaException(e, {
          record_does_not_exist: ctx.i18n.t('exceptions.not_found.report'),
        });
      });
  }
}
