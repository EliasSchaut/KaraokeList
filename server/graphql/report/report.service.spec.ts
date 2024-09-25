import { Test, TestingModule } from '@nestjs/testing';
import { ReportService } from './report.service';
import { PrismaService } from 'nestjs-prisma';
import { ReportModel } from '@/types/models/report.model';
import { ReportInputModel } from '@/types/models/inputs/report.input';
import { CtxType } from '@/types/common/ctx.type';
import { I18nContext } from 'nestjs-i18n';
import { PrismaException } from '@/common/exceptions/prisma.exception';

describe('ReportService', () => {
  let reportService: ReportService;
  let prismaService: PrismaService;
  let ctx: CtxType;

  beforeEach(async () => {
    jest.spyOn(I18nContext, 'current').mockReturnValue({
      t: jest.fn().mockReturnValue('test'),
    } as any);
    ctx = {
      i18n: I18nContext.current()!,
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReportService,
        {
          provide: PrismaService,
          useValue: {
            report: {
              findMany: jest.fn(),
              findUnique: jest.fn(),
              create: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    reportService = module.get<ReportService>(ReportService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('finds many reports successfully', async () => {
    const reports = [{ id: 1, track_id: 1, desc: 'Test Report' }];
    jest.spyOn(prismaService.report, 'findMany').mockResolvedValue(reports);

    const result = await reportService.find_many(ctx);

    expect(result).toEqual(reports);
  });

  it('creates a report successfully', async () => {
    const reportInput: ReportInputModel = { track_id: 1, desc: 'Test Report' };
    const createdReport = {
      id: 1,
      desc: 'Test Report',
      track_id: 1,
      track: {
        id: 1,
        title: 'Test Track',
        artist: { id: 1, name: 'Test Artist' },
      },
    };
    jest.spyOn(prismaService.report, 'create').mockResolvedValue(createdReport);

    const result = await reportService.create(reportInput, ctx);

    expect(result).toEqual(new ReportModel(createdReport));
  });

  it('deletes a report successfully', async () => {
    const report = {
      id: 1,
      track_id: 1,
      desc: 'Test Report',
      track: {
        id: 1,
        title: 'Test Track',
        artist: { id: 1, name: 'Test Artist' },
      },
    };
    jest.spyOn(prismaService.report, 'delete').mockResolvedValue(report);

    const result = await reportService.delete(1, ctx);

    expect(result).toEqual(new ReportModel(report));
  });

  it('throws WarningException if report not found when deleting', async () => {
    jest
      .spyOn(prismaService.report, 'delete')
      .mockRejectedValue(new Error('Report does not exist'));

    await expect(reportService.delete(1, ctx)).rejects.toThrow(PrismaException);
  });
});
