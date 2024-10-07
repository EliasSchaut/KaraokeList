import { MelodyManiaLoadedSongsType } from '@/types/queue/melody_mania_loaded_songs.type';

export class QueueDto {
  'SongDto'!: MelodyManiaLoadedSongsType['SongList'][0];
  'SingScenePlayerDataDto': {
    PlayerProfileNames: Array<string>;
  };
}
