import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@services/auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.pug',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public apiUrl = environment.apiUrl;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.checkIfAuthed();
  }


  public async authWithSpotify() {
    try {
      const res = await this.authService.authWithSpotify();
    } catch (error) {
      console.log(error);
    }
  }


  public async checkIfAuthed() {
    try {
      const res = await this.authService.checkIfAuthed();
      if (res['authed']) {
        this.router.navigate(['/game']);
      }
    } catch (error) {
      console.log('Unauthorized');
    }
  }
}

