import { MelodyManiaSongType } from '@/types/queue/melody_mania_song.type';

export class MelodyManiaLoadedSongsType {
  IsSongScanFinished!: boolean;
  SongCount!: number;
  SongList!: Array<MelodyManiaSongType>;
}
