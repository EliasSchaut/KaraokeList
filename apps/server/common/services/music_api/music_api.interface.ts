import { TrackMetadataModel } from '@/types/models/track_metadata.model';

export interface MusicApi {
  find_track(
    track_title: string,
    track_artist: string,
  ): Promise<TrackMetadataModel | null>;
}
