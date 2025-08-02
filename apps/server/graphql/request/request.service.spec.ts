import { Test, TestingModule } from '@nestjs/testing';
import { RequestService } from './request.service';
import { PrismaService } from 'nestjs-prisma';
import { PrismaException } from '@/common/exceptions/prisma.exception';
import { RequestModel } from '@/types/models/request.model';
import { TrackInputModel } from '@/types/models/inputs/track.input';
import { CtxType } from '@/types/common/ctx.type';
import { I18nContext } from 'nestjs-i18n';

describe('RequestService', () => {
  let requestService: RequestService;
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
        RequestService,
        {
          provide: PrismaService,
          useValue: {
            request: {
              findMany: jest.fn(),
              create: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();
    requestService = module.get<RequestService>(RequestService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('creates a request successfully', async () => {
    const requestInput: TrackInputModel = {
      track_title: 'Test Track',
      artist_name: 'Test Artist',
    };
    const createdRequest = {
      id: 1,
      track_title: 'Test Track',
      artist_name: 'Test Artist',
    };

    jest
      .spyOn(prismaService.request, 'create')
      .mockResolvedValue(createdRequest);

    const result = await requestService.create(requestInput, ctx);

    expect(result).toEqual(new RequestModel(createdRequest));
  });

  it('throws PrismaException on unique constraint violation', async () => {
    const requestInput: TrackInputModel = {
      track_title: 'Test Track',
      artist_name: 'Test Artist',
    };

    jest
      .spyOn(prismaService.request, 'create')
      .mockRejectedValue(new Error('Unique constraint violation'));

    await expect(requestService.create(requestInput, ctx)).rejects.toThrow(
      PrismaException,
    );
  });

  it('finds many requests successfully', async () => {
    const foundRequests = [
      { id: 1, track_title: 'Test Track', artist_name: 'Test Artist' },
    ];

    jest
      .spyOn(prismaService.request, 'findMany')
      .mockResolvedValue(foundRequests);
    const result = await requestService.find_many(ctx);

    expect(result).toEqual(foundRequests as RequestModel[]);
  });

  it('deletes a request successfully', async () => {
    const deletedRequest = {
      id: 1,
      track_title: 'Test Track',
      artist_name: 'Test Artist',
    };

    jest
      .spyOn(prismaService.request, 'delete')
      .mockResolvedValue(deletedRequest);

    const result = await requestService.delete(1, ctx);

    expect(result).toEqual(new RequestModel(deletedRequest));
  });

  it('throws PrismaException on delete if record does not exist', async () => {
    jest
      .spyOn(prismaService.request, 'delete')
      .mockRejectedValue(new Error('Record does not exist'));

    await expect(requestService.delete(1, ctx)).rejects.toThrow(
      PrismaException,
    );
  });
});
