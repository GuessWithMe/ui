import { Component, OnInit, OnDestroy } from '@angular/core';

import { PlaylistService, SocketService } from '@services';
import { Playlist } from 'src/types/Playlist';
import { PlaylistItem } from 'src/types/SpotifyPlaylists';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.pug',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit, OnDestroy {
  public playlists: PlaylistItem[];
  public progress = {};
  private socket: SocketIOClient.Socket;

  color = 'primary';
  mode = 'determinate';
  value = 0.5;

  constructor(private playlistService: PlaylistService, private socketService: SocketService) {}

  async ngOnInit() {
    this.initiateSockets();

    try {
      const res = await this.playlistService.getPlaylists();
      this.playlists = res.items;
    } catch (error) {
      console.log(error);
    }
  }

  ngOnDestroy() {
    this.socket = null;
  }

  public async importPlaylist(playlist: Playlist) {
    try {
      await this.playlistService.importPlaylist(playlist);
    } catch (error) {
      console.log(error);
    }
  }

  private initiateSockets(): void {
    this.socket = this.socketService.getSocket();

    this.socket.on('playlistProgress', (data: { progress: number; playlistId: string }) => {
      this.progress[data.playlistId] = data.progress * 100;
    });

    this.socketService.setSocket(this.socket);
  }
}
