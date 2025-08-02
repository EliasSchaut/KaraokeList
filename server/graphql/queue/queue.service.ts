import { Injectable } from '@nestjs/common';
import { QueueApiService } from '@/common/services/queue_api/queue_api.service';
import { CtxType } from '@/types/common/ctx.type';
import { TrackService } from '@/graphql/track/track.service';
import { QueueInputModel } from '@/types/models/inputs/queue.input';

@Injectable()
export class QueueService {
  constructor(
    private readonly queueApi: QueueApiService,
    private readonly trackService: TrackService,
  ) {}

  async start_queue(host: string, ctx: CtxType): Promise<boolean> {
    return this.queueApi.start(host);
  }

  async stop_queue(ctx: CtxType) {
    return this.queueApi.stop();
  }

  async push_to_queue(queue_input: QueueInputModel, ctx: CtxType) {
    const track = await this.trackService.find_by_id(queue_input.track_id, ctx);
    if (!track) {
      return false;
    }

    return this.queueApi.push_track(
      {
        track_id: track.id,
        track_title: track.title,
        artist_name: track.artist.name,
      },
      queue_input.issuer,
    );
  }
}
