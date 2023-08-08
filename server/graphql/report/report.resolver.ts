import {
  Query,
  Resolver,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ServerID } from '@/common/decorators/server.decorator';
import { I18n, I18nContext } from 'nestjs-i18n';
import { I18nTranslations } from '@/types/generated/i18n.generated';
import { ReportModel } from '@/types/models/report.model';
import { ReportService } from '@/graphql/report/report.service';
import { ReportInputModel } from '@/types/models/inputs/report.input';
import { TrackModel } from '@/types/models/track.model';

@Resolver(() => ReportModel)
export class ReportResolver {
  constructor(private readonly reportService: ReportService) {}

  @Query(() => [ReportModel])
  async reports(
    @ServerID() server_id: number,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<ReportModel[]> {
    return this.reportService.find_all({ server_id, i18n });
  }

  @ResolveField(() => TrackModel, {
    description: 'Track to report',
  })
  async report_track(
    @Parent() report: ReportModel,
    @ServerID() server_id: number,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<TrackModel> {
    return this.reportService.find_track_of_report(report.id, {
      server_id,
      i18n,
    });
  }

  @Mutation(() => ReportModel)
  async report_create(
    @Args('report') report: ReportInputModel,
    @ServerID() server_id: number,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<ReportModel> {
    return this.reportService.create(report, { server_id, i18n });
  }
}
