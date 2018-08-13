import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PlaylistsComponent } from './playlists/playlists.component';

import { Interceptor } from '@services/interceptor';
import { SpotifyService } from '@services/spotify.service';
import { UserService } from '@services/user.service';

import { AuthModule } from './auth/auth.module';
import { AppRoutingModule } from './app-routing.module';
import { GameModule } from './game/game.module';


@NgModule({
  declarations: [
    AppComponent,
    PlaylistsComponent
  ],
  imports: [
    AuthModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    GameModule,
  ],
  providers: [
    HttpClient,
    SpotifyService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
