import { Injectable } from '@nestjs/common';
import { Client, Track } from 'spotify-api.js';
import { MusicApi } from '@/common/services/music_api/music_api.interface';
import { MusicApiService } from '@/common/services/music_api/music_api.service';
import { DangerException } from '@/common/exceptions/danger.exception';
import { SpotifyApiType } from '@/types/music/spotify_api.type';
import { I18nContext } from 'nestjs-i18n';

@Injectable()
export class SpotifyApiService extends MusicApiService implements MusicApi {
  private readonly client: Client;

  constructor() {
    super();
    this.client = new Client({
      refreshToken: true,
      retryOnRateLimit: true,
      token: {
        clientID: process.env.SPOTIFY_CLIENT_ID as string,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
      },
    });
  }

  async fetch_track(
    track_title: string,
    track_artist: string,
  ): Promise<SpotifyApiType | null> {
    let tracks: Track[] | undefined;

    try {
      tracks = (
        await this.client.search(
          `track:${track_title} artist:${track_artist}`,
          {
            types: ['track'],
            limit: 1,
          },
        )
      ).tracks;
    } catch (e) {
      throw new DangerException(
        I18nContext.current()!.t('exceptions.music_api.error'),
        e,
      );
    }

    if (tracks === undefined || tracks.length === 0) {
      return null;
    }

    return new SpotifyApiType(tracks[0]);
  }
}
