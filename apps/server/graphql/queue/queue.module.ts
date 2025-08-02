import { Module } from '@nestjs/common';
import { QueueApiServiceProvider } from '@/common/services/queue_api/queue_api.provider';
import { QueueService } from '@/graphql/queue/queue.service';
import { QueueResolver } from '@/graphql/queue/queue.resolver';
import { TrackModule } from '@/graphql/track/track.module';
import { I18nLangResolver } from '@/common/middleware/i18n.resolver';

@Module({
  imports: [TrackModule],
  providers: [
    QueueResolver,
    QueueService,
    QueueApiServiceProvider,
    I18nLangResolver,
  ],
})
export class QueueModule {}
