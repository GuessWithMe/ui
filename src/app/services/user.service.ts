import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable()
export class UserService {
  constructor(
    private http: HttpClient
  ) {}

  async getPlaylists() {
    const url = `${environment.apiUrl}/users/playlists`;
    return this.http.get(url).toPromise();
  }


  // async importFromPlaylist() {
  //   const url = `${environment.apiUrl}/users/playlists`;
  //   return this.http.get(url).toPromise();
  // }
}
