import { ExternalMusicType } from '@/types/music/external_music.type';
import { OmitToMusic } from '@/types/music/music.utils';

export class MusicApiType extends ExternalMusicType {
  constructor(metadata: OmitToMusic<MusicApiType>) {
    super();
    Object.assign(this, metadata);
  }

  track_title!: string;
  album_title?: string;
  artists_names?: string[];
  cover_url?: string;
  duration_ms?: number;
  explicit?: boolean;
  release_date?: string;
  preview_url?: string;
  external_link?: string;

  public to_music_type(): MusicApiType {
    return this;
  }
}
