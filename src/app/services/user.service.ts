import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable()
export class UserService {
  constructor(
    private http: HttpClient
  ) {}


  public getUser() {
    const url = `${environment.apiUrl}/users/current`;
    return this.http.get(url).toPromise();
  }
}
