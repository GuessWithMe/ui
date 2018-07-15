import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../environments/environment';

@Injectable()
export class SpotifyService {
  private httpOptions: object;

  constructor(
    private http: HttpClient
  ) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.httpOptions = { headers, withCredentials: true };
  }

  getSong() {
    return this.http.get(
      environment.apiUrl, this.httpOptions
    ).toPromise();
  }
}
