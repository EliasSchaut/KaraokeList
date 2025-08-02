import { Test, TestingModule } from '@nestjs/testing';
import { TrackService } from './track.service';
import { PrismaService } from 'nestjs-prisma';
import { PrismaException } from '@/common/exceptions/prisma.exception';
import { WarningException } from '@/common/exceptions/warning.exception';
import { TrackModel } from '@/types/models/track.model';
import { TrackMetadataModel } from '@/types/models/track_metadata.model';
import { TrackInputModel } from '@/types/models/inputs/track.input';
import { MusicApiService } from '@/common/services/music_api/music_api.service';
import { CtxType } from '@/types/common/ctx.type';
import { I18nContext } from 'nestjs-i18n';
import { MusicApiType } from '@/types/music/music.type';

describe('TrackService', () => {
  let trackService: TrackService;
  let prismaService: PrismaService;
  let musicApiService: MusicApiService;
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
        TrackService,
        {
          provide: PrismaService,
          useValue: {
            track: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              delete: jest.fn(),
            },
            report: {
              findFirst: jest.fn(),
            },
          },
        },
        {
          provide: MusicApiService,
          useValue: {
            find_track: jest.fn(),
          },
        },
      ],
    }).compile();

    trackService = module.get<TrackService>(TrackService);
    prismaService = module.get<PrismaService>(PrismaService);
    musicApiService = module.get<MusicApiService>(MusicApiService);
  });

  it('creates a track successfully', async () => {
    const trackInput: TrackInputModel = {
      track_title: 'Test Track',
      artist_name: 'Test Artist',
    };
    const createdTrack = {
      id: 1,
      title: 'Test Track',
      artist_id: 1,
      artist: { id: 1, name: 'Test Artist' },
    };
    jest.spyOn(prismaService.track, 'create').mockResolvedValue(createdTrack);

    const result = await trackService.create(trackInput, ctx);

    expect(result).toEqual(new TrackModel(createdTrack));
  });

  it('throws PrismaException on unique constraint violation during track creation', async () => {
    const trackInput: TrackInputModel = {
      track_title: 'Test Track',
      artist_name: 'Test Artist',
    };
    jest
      .spyOn(prismaService.track, 'create')
      .mockRejectedValue(new Error('Unique constraint violation'));

    await expect(trackService.create(trackInput, ctx)).rejects.toThrow(
      PrismaException,
    );
  });

  it('finds many tracks successfully', async () => {
    const foundTracks = [
      {
        id: 1,
        title: 'Test Track',
        artist_id: 1,
        artist: { name: 'Test Artist', id: 1 },
      },
    ];
    jest.spyOn(prismaService.track, 'findMany').mockResolvedValue(foundTracks);

    const result = await trackService.find_many();

    expect(result).toEqual(foundTracks as TrackModel[]);
  });

  it('finds track by id successfully', async () => {
    const track = {
      id: 1,
      title: 'Test Track',
      artist_id: 1,
      artist: { name: 'Test Artist', id: 1 },
    };
    jest.spyOn(prismaService.track, 'findUnique').mockResolvedValue(track);

    const result = await trackService.find_by_id(1, ctx);

    expect(result).toEqual(new TrackModel(track));
  });

  it('throws WarningException if track not found by id', async () => {
    jest.spyOn(prismaService.track, 'findUnique').mockResolvedValue(null);

    await expect(trackService.find_by_id(1, ctx)).rejects.toThrow(
      WarningException,
    );
  });

  it('checks if track is reported successfully', async () => {
    jest
      .spyOn(prismaService.report, 'findFirst')
      .mockResolvedValue({ id: 1, track_id: 1, desc: 'Test Report' });

    const result = await trackService.resolve_is_reported(1);

    expect(result).toBe(true);
  });

  it('returns false if track is not reported', async () => {
    jest.spyOn(prismaService.report, 'findFirst').mockResolvedValue(null);

    const result = await trackService.resolve_is_reported(1);

    expect(result).toBe(false);
  });

  it('finds track metadata successfully', async () => {
    const artist = { id: 1, name: 'Test Artist' };
    const track = { id: 1, title: 'Test Track', artist };
    const metadata = new MusicApiType({ track_title: 'Test Track' });
    jest.spyOn(trackService, 'find_by_id').mockResolvedValue(track);
    jest.spyOn(musicApiService, 'find_track').mockResolvedValue(metadata);

    const result = await trackService.resolve_metadata(
      track.title,
      artist.name,
    );

    expect(result).toEqual(new TrackMetadataModel(metadata));
  });

  it('returns empty object if metadata not found', async () => {
    const artist = { id: 1, name: 'Test Artist' };
    const track = { id: 1, title: 'Test Track', artist };
    jest.spyOn(trackService, 'find_by_id').mockResolvedValue(track);
    jest.spyOn(musicApiService, 'find_track').mockResolvedValue(null);

    const result = await trackService.resolve_metadata(
      track.title,
      artist.name,
    );

    expect(result).toEqual({});
  });

  it('deletes a track successfully', async () => {
    const deletedTrack = {
      id: 1,
      title: 'Test Track',
      artist_id: 1,
      artist: { id: 1, name: 'Test Artist' },
    };
    jest.spyOn(prismaService.track, 'delete').mockResolvedValue(deletedTrack);

    const result = await trackService.delete(1, ctx);

    expect(result).toEqual(new TrackModel(deletedTrack));
  });

  it('throws PrismaException on delete if record does not exist', async () => {
    jest
      .spyOn(prismaService.track, 'delete')
      .mockRejectedValue(new Error('Record does not exist'));

    await expect(trackService.delete(1, ctx)).rejects.toThrow(PrismaException);
  });
});
