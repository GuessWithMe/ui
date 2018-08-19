import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game.component';
import { PlaylistsComponent } from '../playlists/playlists.component';


const routes: Routes = [
  {
    path: 'game',
    component: GameComponent,
  },
  {
    path: 'playlists',
    component: PlaylistsComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class GameRoutingModule { }
