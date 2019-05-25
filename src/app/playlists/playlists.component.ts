import { Component, OnInit } from '@angular/core';

import { PlaylistService } from '@services';
import { Playlist } from 'src/types/Playlist';
import { PlaylistItem } from './types';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.pug',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {
  public playlists: PlaylistItem[];

  constructor(private playlistService: PlaylistService) {}

  async ngOnInit() {
    try {
      const res = await this.playlistService.getPlaylists();
      this.playlists = res['items'];
    } catch (error) {
      console.log(error);
    }
  }

  public async importPlaylist(playlist: Playlist) {
    try {
      await this.playlistService.importPlaylist(playlist);
    } catch (error) {
      console.log(error);
    }
  }
}
