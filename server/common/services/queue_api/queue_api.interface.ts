import { QueueTrack } from '@/types/queue/queue.utils';

export interface QueueApiInterface {
  push_track(queue_query: QueueTrack, issuer: string): Promise<void>;
  pop_track(): Promise<QueueTrack | undefined>;
  remove_track(queue_query: QueueTrack): Promise<void>;
  get_queue(): Promise<QueueTrack[]>;
  clear_queue(): Promise<void>;
}
