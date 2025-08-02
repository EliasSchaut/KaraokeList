import { QueueTrack } from '@/types/queue/queue.utils';

export interface QueueApiInterface {
  start(host: string): Promise<boolean>;
  stop(): Promise<boolean>;
  has_started(): boolean;

  push_track(queue_query: QueueTrack, issuer: string): Promise<void>;
  pop_track(): Promise<QueueTrack | undefined>;
  remove_track(queue_query: QueueTrack): Promise<void>;
  get_queue(): Promise<QueueTrack[]>;
  clear_queue(): Promise<void>;
}
