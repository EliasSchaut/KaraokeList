import { Provider } from '@nestjs/common';
import { DangerException } from '@/common/exceptions/danger.exception';
import { QueueApiService } from '@/common/services/queue_api/queue_api.service';
import { MelodieManiaService } from '@/common/services/queue_api/melodie_mania.service';
import { QueueApiTypeEnum } from '@/types/queue/queue.utils';

export const QueueApiServiceProvider: Provider = {
  provide: QueueApiService,
  useClass: (() => {
    switch (process.env.QUEUE_API_TYPE) {
      case QueueApiTypeEnum.MELODY_MANIA:
        return MelodieManiaService;
      default:
        throw new DangerException('Unsupported QUEUE_API_TYPE');
    }
  })(),
};
