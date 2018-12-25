import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Howl } from 'howler';
import * as socketIo from 'socket.io-client';
import FuzzySet from 'fuzzyset.js';

import { environment } from '@environment';
import { UserService, GameService, SocketService } from '@services';
import { User, Guess, Word } from '@t';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.pug',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {
  public activePlayers = [];
  public currentGuess = '';
  public flashGreenBool = false;
  public flashRedBool = false;
  public guess: Guess;
  public socket: SocketIOClient.Socket;
  public sound: Howl;
  public timeLeft = 30;
  public user: User;

  public guessAttemptForm = new FormGroup({
    currentGuess: new FormControl(''),
  });


  constructor(
    private userService: UserService,
    private gameService: GameService,
    private socketService: SocketService,
  ) {}


  async ngOnInit() {
    this.user = await this.userService.getUser();
    localStorage.setItem('user', JSON.stringify(this.user));

    this.initiateSockets();

    // Getting the current song upon starting the game.
    const res = await this.gameService.getStatus();

    this.activePlayers = res['activePlayers'];

    this.timeLeft = res['status']['timeLeft'];
    this.processIncomingSong(res['status']['currentSong']);

    this.gameService.song.subscribe(song => {
      this.processIncomingSong(song);
    });

    setInterval(() => {
      if (this.timeLeft > 0 ) {
        this.timeLeft = this.timeLeft - 1;
      }
    }, 1000);
  }


  ngOnDestroy() {
    this.socketService.setSocket(null);
    this.gameService.removeUserFromPlayerList(this.socket);

    if (this.sound) {
      this.sound.stop();
    }
}


  private initiateSockets() {
    this.socket = this.socketService.getSocket();

    if (this.socket) {
      return;
    }

    this.socket = socketIo(environment.socketUrl);
    this.socket.on('song', song => {
      this.gameService.setCurrentSong(song);
    });

    this.socket.on('pause', () => {
      this.gameService.setCurrentSong(null);
      this.timeLeft = 0;
    });

    this.socket.on('disconnect', data => {
      // this.gameService.removeUserFromPlayerList(this.socket);
    });

    this.socket.on('connect', data => {
      // On succesfull connection send a request with socket id to populate
      // active user list.
      this.gameService.addUserToPlayerList(this.socket);
    });

    this.socket.on('broadcast', data => {

    });


    this.socket.on('activePlayers', activePlayers => {
      this.activePlayers = activePlayers;
    });

    this.socketService.setSocket(this.socket);
  }


  private prepareGuessArray(songData: object) {
    this.guess = {
      artist: [],
      title: [],
      artistCorrect: false,
      titleCorrect: false,
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

    this.timeLeft = 30;
    this.sound.play();
  }


  public matchGuessInput() {
    const input = this.guessAttemptForm.value.currentGuess;
    const inputWords = input.split(' ');
    let somethingWasCorrect = false;

    for (const inputWord of inputWords) {
      this.guess.artist.map(guessWord => {
        // No need to check if word already guessed
        if (!guessWord.correct) {
          const fuzzyset = FuzzySet();
          fuzzyset.add(guessWord.word.toLowerCase());
          const match = fuzzyset.get(inputWord.toLowerCase());

          if (match && match[0][0] > 0.74) {
            somethingWasCorrect = true;
            guessWord.correct = true;
          }
        }

        return guessWord;
      });

      this.guess.title.map(guessWord => {
        // No need to check if word already guessed
        if (!guessWord.correct) {
          const fuzzyset = FuzzySet();
          fuzzyset.add(guessWord.word.toLowerCase());
          const match = fuzzyset.get(inputWord.toLowerCase());

          if (match && match[0][0] > 0.64) {
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

    this.checkIfTitleOrArtistDone();
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


  public timesUp() {}


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


  private checkIfTitleOrArtistDone() {
    let titleIsDone = true;
    for (const name of this.guess.title) {
      if (!name.correct) {
        titleIsDone = false;
        break;
      }
    }

    let artistIsDone = true;
    for (const name of this.guess.artist) {
      if (!name.correct) {
        artistIsDone = false;
        break;
      }
    }


    let needsProgressUpdate = false;
    if (this.guess.artistCorrect !== artistIsDone) {
      this.guess.artistCorrect = artistIsDone;
      needsProgressUpdate = true;
    }

    if (this.guess.titleCorrect !== titleIsDone) {
      this.guess.titleCorrect = titleIsDone;
      needsProgressUpdate = true;
    }


    if (needsProgressUpdate) {
      this.sendProgressUpdateToOtherPlayers();
    }
  }


  private sendProgressUpdateToOtherPlayers() {
    try {
      this.socket.emit('guessProgressUpdate', {
        userId: this.user.id,
        spotifyUsername: this.user.spotifyUsername,
        titleCorrect: this.guess.titleCorrect,
        artistCorrect: this.guess.artistCorrect,
      });
    } catch (error) {
      console.log(error);
    }
  }

}

