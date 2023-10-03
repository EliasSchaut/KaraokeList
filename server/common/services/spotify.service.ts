import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Client, Track } from 'spotify-api.js';

@Injectable()
export class SpotifyService {
  client: Client;

  constructor() {
    this.client = new Client({
      refreshToken: true,
      retryOnRateLimit: true,
      token: {
        clientID: process.env.SPOTIFY_CLIENT_ID as string,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
      },
    });
  }

  async find_track(
    track_title: string,
    track_artist: string,
  ): Promise<Track | undefined> {
    let tracks: Track[] | undefined;
    const fetch_timeout = setTimeout(() => {
      throw new InternalServerErrorException('Spotify API timeout');
    }, Number(process.env.SPOTIFY_API_TIMEOUT));

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
      throw new InternalServerErrorException('Spotify API error', { cause: e });
    } finally {
      clearTimeout(fetch_timeout);
    }

    if (tracks === undefined || tracks.length === 0) {
      return undefined;
    }

    return tracks[0];
  }
}
