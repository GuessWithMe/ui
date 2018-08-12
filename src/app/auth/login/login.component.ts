import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.pug',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService
  ) {}

  async ngOnInit() {

  }


  public async authWithSpotify() {
    try {
      const res = await this.authService.authWithSpotify();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
}

