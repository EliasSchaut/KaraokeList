import {
  Query,
  Resolver,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { I18n, I18nContext } from 'nestjs-i18n';
import { I18nTranslations } from '@/types/generated/i18n.generated';
import { ReportModel } from '@/types/models/report.model';
import { ReportService } from '@/graphql/report/report.service';
import { ReportInputModel } from '@/types/models/inputs/report.input';
import { TrackModel } from '@/types/models/track.model';

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

  @ResolveField(() => TrackModel, {
    name: 'report_track',
    description: 'Track to report',
  })
  async resolve_track(
    @Parent() report: ReportModel,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<TrackModel> {
    return this.reportService.resolve_track(report.id, {
      i18n,
    });
  }
}
