import { Injectable } from '@nestjs/common';
import { MusicApi } from '@/common/services/music_api/music_api.interface';
import { MusicApiType } from '@/types/music/music.type';
import { ExternalMusicType } from '@/types/music/external_music.type';
import { DangerException } from '@/common/exceptions/danger.exception';
import process from 'node:process';
import { I18nContext } from 'nestjs-i18n';

@Injectable()
export abstract class MusicApiService implements MusicApi {
  private readonly TIMEOUT_IN_MS: number = Number(
    process.env.MUSIC_TIMEOUT_IN_MS,
  );

  public async find_track(
    track_title: string,
    track_artist: string,
  ): Promise<MusicApiType | null> {
    const external_music = await Promise.race([
      this.fetch_track(track_title, track_artist),
      this.create_fetch_timeout().catch((e) => {
        throw e;
      }),
    ]);
    if (external_music === null) return null;
    try {
      return external_music.to_music_type();
    } catch (e) {
      return null;
    }
  }

  protected abstract fetch_track(
    track_title: string,
    track_artist: string,
  ): Promise<ExternalMusicType | null>;

  private async create_fetch_timeout(): Promise<never> {
    return new Promise((_, reject) => {
      setTimeout(() => {
        reject(
          new DangerException(
            I18nContext.current()!.t('exceptions.music_api.timeout'),
          ),
        );
      }, this.TIMEOUT_IN_MS);
    });
  }
}
