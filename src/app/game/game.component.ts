import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as socketIo from 'socket.io-client';

import { Howl } from 'howler';
import * as moment from 'moment';

import { environment } from '../../environments/environment';
import { CountdownComponent } from 'ngx-countdown';
import { UserService } from '@services/user.service';
import { GameService } from '@services/game.service';


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
export class GameComponent implements OnInit, OnDestroy {
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

  public sound;

  public socket;

  public guessAttemptForm = new FormGroup({
    currentGuess: new FormControl(''),
  });


  constructor(
    private userService: UserService,
    private gameService: GameService,
  ) {}

  async ngOnInit() {
    this.initiateSockets();

    // Getting the current song upon starting the game.
    const res = await this.gameService.getSongFromServer();
    this.processIncomingSong(res);

    this.gameService.song.subscribe(song => {
      this.processIncomingSong(song);
    });
  }


  ngOnDestroy() {
    this.counter.stop();

    if (this.sound) {
      this.sound.stop();
    }
  }


  private initiateSockets() {
    this.socket = socketIo(environment.socketUrl);
    this.socket.on('song', song => {
      console.log('song');
      this.gameService.setCurrentSong(song);
    });

    this.socket.on('pause', () => {
      console.log('pause');
      this.gameService.setCurrentSong(null);
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
  }


  public onFinished() {
    this.sound.stop();
    // setTimeout(() => this.counter.restart());
  }


  private prepareGuessArray(songData: object) {
    this.guess = {
      artist: [],
      title: [],
      correct: false
    };

    const artistStripped = this.removeParentheses(songData['artists'][0]['name']);
    for (const word of artistStripped.split(' ')) {
      const cleanWord = this.cleanUpWord(word);
      const guessWord: Word = {
        word: cleanWord,
        correct: false
      };

      this.guess.artist.push(guessWord);
    }

    const titleStripped = this.removeParentheses(songData['name']);
    for (const word of titleStripped.split(' ')) {
      const cleanWord = this.cleanUpWord(word);
      const guessWord: Word = {
        word: cleanWord,
        correct: false
      };
      this.guess.title.push(guessWord);
    }

    console.log(this.guess);
  }


  public processIncomingSong(song): void {
    if (this.sound) {
      this.sound.stop();
    }

    if (!song) {
      return;
    }

    this.prepareGuessArray(song);

    this.sound = new Howl({
      src: [song.previewUrl],
      html5: true
    });

    setTimeout(() => {
      this.counter.restart();
      this.counter.begin();
      this.sound.play();
    });
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


  public cleanUpWord(word): string {
    // Turn accented chars into normal chars.
    word = word.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    // Removing special chars and leaving only numbers, letters
    word = word.replace(/[^A-Za-z0-9\s]/g, '');

    return word;
  }


  public removeParentheses(setOfWords: string): string {
    return setOfWords.replace(/ *\([^)]*\) */g, '');
  }
}

