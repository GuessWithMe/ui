import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable()
export class PlaylistService {
  constructor(
    private http: HttpClient
  ) {}

  async getPlaylists() {
    const url = `${environment.apiUrl}/playlists`;
    return this.http.get(url).toPromise();
  }


  async importPlaylist(playlist) {
    const url = `${environment.apiUrl}/playlists/import`;
    return this.http.post(url, { playlist }).toPromise();
  }
}
