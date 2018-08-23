import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { environment } from './../../environments/environment';

@Injectable()
export class GameService {
  private songSource = new BehaviorSubject(null);
  song = this.songSource.asObservable();

  constructor(
    private http: HttpClient
  ) {}


  public setCurrentSong(song) {
    this.songSource.next(song);
  }


  public getSongFromServer() {
    const url = `${environment.apiUrl}/game/current-song`;
    return this.http.get(url).toPromise();
  }
}
