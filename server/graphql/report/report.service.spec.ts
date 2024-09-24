import { Test, TestingModule } from '@nestjs/testing';
import { ReportService } from './report.service';
import { PrismaService } from 'nestjs-prisma';
import { WarningException } from '@/common/exceptions/warning.exception';
import { ReportModel } from '@/types/models/report.model';
import { ReportInputModel } from '@/types/models/inputs/report.input';
import { TrackModel } from '@/types/models/track.model';
import { CtxType } from '@/types/common/ctx.type';
import { I18nContext } from 'nestjs-i18n';

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

    expect(result).toEqual(reports as ReportModel[]);
  });

  it('creates a report successfully', async () => {
    const reportInput: ReportInputModel = { track_id: 1, desc: 'Test Report' };
    const createdReport = { id: 1, track_id: 1, desc: 'Test Report' };
    jest.spyOn(prismaService.report, 'create').mockResolvedValue(createdReport);

    const result = await reportService.create(reportInput, ctx);

    expect(result).toEqual(new ReportModel(createdReport));
  });

  it('resolves track successfully', async () => {
    const report = {
      track: { id: 1, title: 'Test Track', artist_id: 1 },
      id: 1,
      track_id: 1,
      desc: '',
    };
    jest.spyOn(prismaService.report, 'findUnique').mockResolvedValue(report);

    const result = await reportService.resolve_track(1, ctx);

    expect(result).toEqual(new TrackModel(report.track));
  });

  it('throws WarningException if report not found when resolving track', async () => {
    jest.spyOn(prismaService.report, 'findUnique').mockResolvedValue(null);

    await expect(reportService.resolve_track(1, ctx)).rejects.toThrow(
      WarningException,
    );
  });
});
