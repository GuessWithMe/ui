import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PlaylistsComponent } from './playlists/playlists.component';

import { Interceptor } from '@services/interceptor';
import { PlaylistService } from '@services/playlist.service';
import { SpotifyService } from '@services/spotify.service';
import { UserService } from '@services/user.service';

import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { GameModule } from './game/game.module';
import { MaterialImportsModule } from './material-imports.module';


@NgModule({
  declarations: [
    AppComponent,
    PlaylistsComponent
  ],
  imports: [
    AppRoutingModule,
    AuthModule,
    BrowserAnimationsModule,
    BrowserModule,
    GameModule,
    HttpClientModule,
    MaterialImportsModule
  ],
  providers: [
    HttpClient,
    PlaylistService,
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
