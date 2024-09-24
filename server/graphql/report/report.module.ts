import { Module } from '@nestjs/common';
import { ReportService } from '@/graphql/report/report.service';
import { ReportResolver } from '@/graphql/report/report.resolver';

@Module({
  providers: [ReportResolver, ReportService],
})
export class ReportModule {}
