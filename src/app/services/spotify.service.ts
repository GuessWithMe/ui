import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable()
export class SpotifyService {

  constructor(
    private http: HttpClient
  ) {}

  getSong() {
    return this.http.get(environment.apiUrl).toPromise();
  }
}
