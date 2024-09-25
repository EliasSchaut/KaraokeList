import { Provider } from '@nestjs/common';
import { DangerException } from '@/common/exceptions/danger.exception';
import { SpotifyApiService } from '@/common/services/music_api/spotify_api.service';
import { MusicApiTypeEnum } from '@/types/music/music.utils';
import { MusicApiService } from '@/common/services/music_api/music_api.service';

export const MusicApiServiceProvider: Provider = {
  provide: MusicApiService,
  useClass: (() => {
    switch (process.env.MUSIC_API_TYPE) {
      case MusicApiTypeEnum.SPOTIFY:
        return SpotifyApiService;
      default:
        throw new DangerException('Unsupported MUSIC_API_TYPE');
    }
  })(),
};
