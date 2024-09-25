import { Module } from '@nestjs/common';
import { ReportService } from '@/graphql/report/report.service';
import { ReportResolver } from '@/graphql/report/report.resolver';
import { I18nLangResolver } from '@/common/middleware/i18n.resolver';

@Module({
  providers: [ReportResolver, ReportService, I18nLangResolver],
})
export class ReportModule {}
