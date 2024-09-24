import { Module } from '@nestjs/common';
import { TrackResolver } from '@/graphql/track/track.resolver';
import { TrackService } from '@/graphql/track/track.service';
import { MusicApiServiceProvider } from '@/common/services/music_api/music_api.provider';
import { I18nLangResolver } from '@/common/middleware/i18n.resolver';

@Module({
  providers: [
    TrackResolver,
    TrackService,
    I18nLangResolver,
    MusicApiServiceProvider,
  ],
})
export class TrackModule {}
