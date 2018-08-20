import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as socketIo from 'socket.io-client';


import { Howl } from 'howler';
import * as moment from 'moment';

import { environment } from '../../environments/environment';
import { CountdownComponent } from 'ngx-countdown';
import { SpotifyService } from '@services/spotify.service';
import { UserService } from '@services/user.service';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

export interface Word {
  word: string;
  correct: boolean;
}

export interface Guess {
  artist: Word[];
  title: Word[];
  correct: boolean;
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.pug',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  @ViewChild(CountdownComponent) counter: CountdownComponent;
  title = 'app';
  previewUrl;

  public guess: Guess;
  public currentGuess = '';
  public flashGreenBool = false;
  public flashRedBool = false;
  public timerEndTime;
  public countdownConfig = {
    template: '$!h!:$!m!:$!s!',
    leftTime: 30,
    demand: true,
  };

  public socket;

  public guessAttemptForm = new FormGroup({
    currentGuess: new FormControl(''),
  });


  constructor(
    private spotifyService: SpotifyService,
    private userService: UserService,
  ) {}

  async ngOnInit() {
    this.socket = socketIo(environment.socketUrl);
    this.socket.on('event', data => {
      // console.log('received event');
      console.log('event received', data);
    });

    this.socket.on('disconnect', data => {
      // console.log('disconnect');
    });

    this.socket.on('connect', data => {
      console.log('connect');
    });

    this.socket.on('broadcast', data => {
      console.log('broadcast');
    });

    this.socket.emit('message', {
      text: 'sanaca'
    });



    try {
      // const res = await this.userService.getPlaylists();

      // const res = await this.spotifyService.getSong();
      // this.previewUrl = res['preview_url'];
      // const sound = new Howl({
      //   src: [this.previewUrl],
      //   html5: true
      // });

      // this.prepareGuessArray(res);
      // this.counter.begin();

      // sound.play();
    } catch (error) {
      console.log(error);
    }
  }


  private prepareGuessArray(songData: object) {
    this.guess = {
      artist: [],
      title: [],
      correct: false
    };

    for (const word of songData['artists'][0]['name'].split(' ')) {
      const guessWord: Word = {
        word,
        correct: false
      };

      this.guess.artist.push(guessWord);
    }

    for (const word of songData['name'].split(' ')) {
      const guessWord: Word = {
        word,
        correct: false
      };
      this.guess.title.push(guessWord);
    }
  }


  public matchGuessInput() {
    const input = this.guessAttemptForm.value.currentGuess;
    const inputWords = input.split(' ');
    let somethingWasCorrect = false;

    for (const inputWord of inputWords) {
      this.guess.artist.map(guessWord => {
        // No need to check if word already guessed
        if (!guessWord.correct) {
          if (guessWord.word.toLowerCase() === inputWord.toLowerCase()) {
            somethingWasCorrect = true;
            guessWord.correct = true;
          }
        }

        return guessWord;
      });

      this.guess.title.map(guessWord => {
        // No need to check if word already guessed
        if (!guessWord.correct) {
          if (guessWord.word.toLowerCase() === inputWord.toLowerCase()) {
            somethingWasCorrect = true;
            guessWord.correct = true;
          }
        }

        return guessWord;
      });

      this.guessAttemptForm.reset();

      if (somethingWasCorrect) {
        this.flashGreen();
      } else {
        this.flashRed();
      }
    }
  }


  public flashGreen() {
    this.flashGreenBool = true;
    this.flashRedBool = false;

    setTimeout(() => {
      this.flashGreenBool = false;
    }, 600);
  }


  public flashRed() {
    this.flashRedBool = true;
    this.flashGreenBool = false;

    setTimeout(() => {
      this.flashRedBool = false;
    }, 600);
  }


  public timesUp() {
    console.log('timesUp');
  }
}

