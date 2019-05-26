import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '@environment';
import { Playlist } from 'src/types/Playlist';
import { SpotifyPlaylists } from 'src/types/SpotifyPlaylists';

@Injectable()
export class PlaylistService {
  constructor(private http: HttpClient) {}

  getPlaylists(): Promise<SpotifyPlaylists> {
    const url = `${environment.apiUrl}/playlists`;
    return this.http.get(url).toPromise() as Promise<SpotifyPlaylists>;
  }

  importPlaylist(playlist: Playlist) {
    const url = `${environment.apiUrl}/playlists/import`;
    return this.http.post(url, { playlistId: playlist.id }).toPromise();
  }
}
