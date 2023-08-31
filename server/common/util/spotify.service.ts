import { Injectable } from '@nestjs/common';
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

  async get_track(spotify_id: string) {
    return {};
  }

  async find_track(
    track_title: string,
    track_artist: string,
  ): Promise<Track | undefined> {
    const { tracks } = await this.client.search(
      `track:${track_title} artist:${track_artist}`,
      {
        types: ['track'],
        limit: 1,
      },
    );

    if (tracks === undefined || tracks.length === 0) {
      return undefined;
    }

    return tracks[0];
  }
}
