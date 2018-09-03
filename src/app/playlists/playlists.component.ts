import { Component, OnInit } from '@angular/core';

import { PlaylistService } from '@services';


@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.pug',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {
  public displayedColumns: string[] = [
    'image', 'name', 'songs', 'actions'
  ];
  public playlists;

  constructor(
    private playlistService: PlaylistService
  ) {}

  async ngOnInit() {
    try {
      const res = await this.playlistService.getPlaylists();
      this.processPlaylistsForTable(res['items']);
    } catch (error) {
      console.log(error);
    }
  }

  private processPlaylistsForTable(playlists: object[]): void {
    this.playlists = [];
    for (const playlist of playlists) {
      const playlistObj = {
        name: playlist['name'],
        tracks: playlist['tracks'],
        spotifyId: playlist['id'],
      };

      if (playlist['images'][2]) {
        playlistObj['imageUrl'] = playlist['images'][2]['url'];
      }

      this.playlists.push(playlistObj);
    }
  }


  public async importPlaylist(playlist) {
    try {
      await this.playlistService.importPlaylist(playlist);
    } catch (error) {
      console.log(error);
    }
  }
}

