import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { I18n, I18nContext } from 'nestjs-i18n';
import { I18nTranslations } from '@/types/generated/i18n.generated';
import { ReportModel } from '@/types/models/report.model';
import { ReportService } from '@/graphql/report/report.service';
import { ReportInputModel } from '@/types/models/inputs/report.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@/graphql/auth/auth.admin.guard';

@Resolver(() => ReportModel)
export class ReportResolver {
  constructor(private readonly reportService: ReportService) {}

  @Query(() => [ReportModel], {
    name: 'reports',
  })
  async find_many(
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<ReportModel[]> {
    return this.reportService.find_many({ i18n });
  }

  @Mutation(() => ReportModel, {
    name: 'report_create',
  })
  async create(
    @Args('report') report: ReportInputModel,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<ReportModel> {
    return this.reportService.create(report, { i18n });
  }

  @UseGuards(AuthGuard)
  @Mutation(() => ReportModel, {
    name: 'report_delete',
  })
  async delete(
    @Args('id') id: number,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<ReportModel> {
    return this.reportService.delete(id, { i18n });
  }
}
