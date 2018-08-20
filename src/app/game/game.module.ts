import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CountdownModule } from 'ngx-countdown';

import { GameComponent } from './game.component';
import { GameRoutingModule } from './game-routing.module';
import { MaterialImportsModule } from './../material-imports.module';
import { GameService } from '@services/game.service';

@NgModule({
  declarations: [
    GameComponent
  ],
  imports: [
    CommonModule,
    GameRoutingModule,
    MaterialImportsModule,
    FormsModule,
    ReactiveFormsModule,
    CountdownModule,
  ],
  providers: [
    GameService
  ],
})
export class GameModule { }
