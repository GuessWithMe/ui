import { Component, OnInit } from '@angular/core';
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
    private authService: AuthService
  ) {}

  async ngOnInit() {

  }


  public async authWithSpotify() {
    try {
      const res = await this.authService.authWithSpotify();
    } catch (error) {
      console.log(error);
    }
  }
}

