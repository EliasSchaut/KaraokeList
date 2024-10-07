import { Injectable } from '@nestjs/common';
import { QueueApiService } from '@/common/services/queue_api/queue_api.service';
import { QueueTrack } from '@/types/queue/queue.utils';
import { ApiService } from '@/common/services/api.service';
import { MelodyManiaLoadedSongsType } from '@/types/queue/melody_mania_loaded_songs.type';
import { DangerException } from '@/common/exceptions/danger.exception';
import { QueueDto } from '@/types/queue/queue.dto';
import { MelodyManiaSongType } from '@/types/queue/melody_mania_song.type';

@Injectable()
export class MelodieManiaService extends QueueApiService {
  private readonly api_host;
  private readonly client_id: string = process.env.MELODY_MANIA_CLIENT_ID!;
  private loaded_songs: MelodyManiaLoadedSongsType['SongList'] = [];

  constructor(api_host: string) {
    super();
    this.api_host = api_host;
    this.fetch_loaded_songs().then((loaded_songs) => {
      if (!loaded_songs.IsSongScanFinished) {
        throw new DangerException('[Melody Mania] Song scan is not finished');
      }
      this.loaded_songs = loaded_songs.SongList;
    });
  }

  async push_track(queue_query: QueueTrack, issuer: string): Promise<void> {
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

  async pop_track(): Promise<QueueTrack | undefined> {
    throw new Error('Method not supported.');
  }

  async remove_track(queue_query: QueueTrack): Promise<void> {
    throw new Error('Method not supported.');
  }

  async get_queue(): Promise<QueueTrack[]> {
    throw new Error('Method not implemented.');
  }

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
    return ApiService.call_api(`${this.api_host}/api/rest/songQueue/loaded`);
  }
}
