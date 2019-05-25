import { Tracks } from 'src/types/Playlist';

export interface PlaylistItem {
  name: string;
  tracks: Tracks;
  spotifyId: string;
}
