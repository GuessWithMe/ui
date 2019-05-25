import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '@environment';
import { Playlist } from 'src/types/Playlist';

@Injectable()
export class PlaylistService {
  constructor(private http: HttpClient) {}

  getPlaylists() {
    const url = `${environment.apiUrl}/playlists`;
    return this.http.get(url).toPromise();
  }

  importPlaylist(playlist: Playlist) {
    const url = `${environment.apiUrl}/playlists/import`;
    return this.http.post(url, { playlistId: playlist.id }).toPromise();
  }
}
