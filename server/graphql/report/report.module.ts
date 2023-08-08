import { Module } from '@nestjs/common';
import { ReportService } from '@/graphql/report/report.service';
import { ReportResolver } from '@/graphql/report/report.resolver';
import { PrismaService } from '@/common/db/prisma.service';

@Module({
  providers: [ReportResolver, ReportService, PrismaService],
})
export class ReportModule {}
