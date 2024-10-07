import { Injectable } from '@nestjs/common';
import { QueueApiInterface } from '@/common/services/queue_api/queue_api.interface';
import { QueueTrack } from '@/types/queue/queue.utils';

@Injectable()
export abstract class QueueApiService implements QueueApiInterface {
  protected queue: QueueTrack[] = [];

  public abstract push_track(
    queue_query: QueueTrack,
    issuer: string,
  ): Promise<void>;

  public abstract pop_track(): Promise<QueueTrack | undefined>;

  public abstract remove_track(queue_query: QueueTrack): Promise<void>;

  public abstract get_queue(): Promise<QueueTrack[]>;

  public abstract clear_queue(): Promise<void>;
}
