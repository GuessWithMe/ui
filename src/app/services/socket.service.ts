import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { environment } from './../../environments/environment';

@Injectable()
export class SocketService {
  private socketSource = new BehaviorSubject(null);
  socket = this.socketSource.asObservable() as any;

  constructor(
    private http: HttpClient
  ) {}


  public setSocket(socket) {
    this.socketSource.next(socket);
  }
}
