import { Album, Artist, ExternalUrl, Track } from 'spotify-api.js';
import { ExternalMusicType } from '@/types/music/external_music.type';
import { MusicApiType } from '@/types/music/music.type';

export class SpotifyApiType extends ExternalMusicType {
  constructor(track: Track) {
    super();
    Object.assign(this, track);
  }

  name!: string;
  artists?: Artist[];
  album?: Album;
  duration?: number;
  explicit?: boolean;
  previewURL?: string;
  externalURL?: ExternalUrl;

  public to_music_type(): MusicApiType {
    return new MusicApiType({
      track_title: this.name,
      album_title: this.album?.name,

      artists_names: this.artists?.map((artist) => artist.name) ?? [],
      cover_url: this.album?.images[0]?.url,
      duration_ms: this.duration,
      explicit: this.explicit,
      release_date: this.album?.releaseDate,
      preview_url: this.previewURL,
      external_link: this.externalURL?.spotify,
    });
  }
}
