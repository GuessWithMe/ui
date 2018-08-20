import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable()
export class GameService {
  private songSource = new BehaviorSubject(null);
  song = this.songSource.asObservable();

  constructor() {}


  public setCurrentSong(song) {
    this.songSource.next(song);
  }
}
