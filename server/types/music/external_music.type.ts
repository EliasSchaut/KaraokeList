import { MusicApiType } from '@/types/music/music.type';

export abstract class ExternalMusicType {
  public abstract to_music_type(): MusicApiType;
}
