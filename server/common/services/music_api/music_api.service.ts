import { Injectable } from '@nestjs/common';
import { MusicApi } from '@/common/services/music_api/music_api.interface';
import { MusicApiType } from '@/types/music/music.type';
import { ExternalMusicType } from '@/types/music/external_music.type';
import { ApiService } from '@/common/services/api.service';

@Injectable()
export abstract class MusicApiService implements MusicApi {
  public async find_track(
    track_title: string,
    track_artist: string,
  ): Promise<MusicApiType | null> {
    let abort_timeout = false;
    const external_music = await Promise.race([
      this.fetch_track(track_title, track_artist),
      ApiService.create_fetch_timeout({
        custom_timeout_error: 'exceptions.music_api.timeout',
      }).catch((e) => {
        if (!abort_timeout) throw e;
      }),
    ]);
    abort_timeout = true;
    if (!(external_music instanceof ExternalMusicType)) return null;
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
}
