import { Injectable } from '@nestjs/common';
import { QueueApiService } from '@/common/services/queue_api/queue_api.service';
import { QueueTrack } from '@/types/queue/queue.utils';
import { ApiService } from '@/common/services/api.service';
import { MelodyManiaLoadedSongsType } from '@/types/queue/melody_mania_loaded_songs.type';
import { DangerException } from '@/common/exceptions/danger.exception';
import { QueueDto } from '@/types/queue/queue.dto';
import { MelodyManiaSongType } from '@/types/queue/melody_mania_song.type';
import { CheckQueueOnline } from '@/common/decorators/queue_online.decorator';

@Injectable()
export class MelodieManiaService extends QueueApiService {
  private readonly client_id: string = process.env.MELODY_MANIA_CLIENT_ID!;
  private loaded_songs: MelodyManiaSongType[] = [];

  constructor() {
    super();
  }

  async start(host: string): Promise<boolean> {
    await super.start(host);
    this.fetch_loaded_songs().then((loaded_songs) => {
      if (!loaded_songs.IsSongScanFinished) {
        this.stop();
        throw new DangerException('[Melody Mania] Song scan is not finished');
      }
      this.loaded_songs = loaded_songs.SongList;
    });
    return true;
  }

  async stop(): Promise<boolean> {
    await super.stop();
    this.loaded_songs = [];
    return true;
  }

  //@CheckQueueOnline()
  async push_track(queue_query: QueueTrack, issuer: string): Promise<void> {
    console.log(queue_query, issuer);
    const song = await this.get_melody_mania_song(queue_query);
    if (!song) {
      throw new DangerException(
        `[Melody Mania] Song not found: ${queue_query.artist_name} - ${queue_query.track_title}`,
      );
    }

    const queue_dto = this.map_query_to_queue_dto(song, issuer);

    await ApiService.call_api(`${this.api_host}/api/rest/songQueue/entry`, {
      fetch_options: {
        method: 'POST',
        body: JSON.stringify(queue_dto),
        headers: {
          'Content-Type': 'application/json',
          'client-id': this.client_id,
        },
      },
    });
  }

  @CheckQueueOnline()
  async pop_track(): Promise<QueueTrack | undefined> {
    throw new Error('Method not supported.');
  }

  @CheckQueueOnline()
  async remove_track(queue_query: QueueTrack): Promise<void> {
    throw new Error('Method not supported.');
  }

  @CheckQueueOnline()
  async get_queue(): Promise<QueueTrack[]> {
    throw new Error('Method not implemented.');
  }

  @CheckQueueOnline()
  async clear_queue(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  private map_query_to_queue_dto(
    song: MelodyManiaSongType,
    issuer: string,
  ): QueueDto {
    return {
      SongDto: {
        Artist: song.Artist,
        Title: song.Title,
        Hash: song.Hash,
      },
      SingScenePlayerDataDto: {
        PlayerProfileNames: [issuer],
      },
    };
  }

  private async get_melody_mania_song(
    queue_query: QueueTrack,
  ): Promise<MelodyManiaSongType | undefined> {
    return this.loaded_songs.find((song) => {
      if (
        song.Artist === queue_query.artist_name &&
        song.Title === queue_query.track_title
      ) {
        return song.Hash;
      }
    });
  }

  private async fetch_loaded_songs(): Promise<MelodyManiaLoadedSongsType> {
    return ApiService.call_api(`${this.api_host}/api/rest/songs`, {
      fetch_options: { method: 'GET' },
    });
  }
}
