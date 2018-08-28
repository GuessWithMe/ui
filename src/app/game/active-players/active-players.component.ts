import { Component, OnInit, Input } from '@angular/core';

import { GameService } from '@services/game.service';

@Component({
  selector: 'app-active-players',
  templateUrl: './active-players.component.pug',
  styleUrls: ['./active-players.component.scss']
})
export class ActivePlayersComponent implements OnInit {
  @Input() activePlayers;
  public displayedColumns: string[] = ['username'];


  constructor(
    private gameService: GameService,
  ) {}


  async ngOnInit() {

  }
}

