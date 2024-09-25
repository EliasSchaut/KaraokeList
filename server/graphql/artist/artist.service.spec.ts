import { Test, TestingModule } from '@nestjs/testing';
import { ArtistService } from './artist.service';
import { PrismaService } from 'nestjs-prisma';
import { WarningException } from '@/common/exceptions/warning.exception';
import { ArtistModel } from '@/types/models/artist.model';
import { TrackModel } from '@/types/models/track.model';
import { CtxType } from '@/types/common/ctx.type';
import { I18nContext } from 'nestjs-i18n';

describe('ArtistService', () => {
  let artistService: ArtistService;
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
        ArtistService,
        {
          provide: PrismaService,
          useValue: {
            artist: {
              findUnique: jest.fn(),
              findMany: jest.fn(),
            },
            track: {
              findMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();
    artistService = module.get<ArtistService>(ArtistService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('finds artist by id successfully', async () => {
    const artist = { id: 1, name: 'Test Artist' };
    jest.spyOn(prismaService.artist, 'findUnique').mockResolvedValue(artist);

    const result = await artistService.find_by_id(1, ctx);

    expect(result).toEqual(new ArtistModel(artist));
  });

  it('throws WarningException if artist not found', async () => {
    jest.spyOn(prismaService.artist, 'findUnique').mockResolvedValue(null);

    await expect(artistService.find_by_id(1, ctx)).rejects.toThrow(
      WarningException,
    );
  });

  it('finds many artists successfully', async () => {
    const artists = [{ id: 1, name: 'Test Artist' }];
    jest.spyOn(prismaService.artist, 'findMany').mockResolvedValue(artists);

    const result = await artistService.find_many(ctx);

    expect(result).toEqual(artists as ArtistModel[]);
  });

  it('resolve tracks by artist id successfully', async () => {
    const tracks = [
      {
        id: 1,
        title: 'Test Track',
        artist_id: 1,
        artist: { name: 'Test Artist', id: 1 },
      },
    ];
    jest.spyOn(prismaService.track, 'findMany').mockResolvedValue(tracks);

    const result = await artistService.resolve_tracks(1, ctx);

    expect(result).toEqual(tracks as TrackModel[]);
  });
});
