export enum MusicApiTypeEnum {
  SPOTIFY = 'SPOTIFY',
}

export type OmitToMusic<T> = Omit<T, 'to_music_type'>;
