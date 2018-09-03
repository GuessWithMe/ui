import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { AuthService } from '@services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.pug',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit() {}


  public async logOut() {
    try {
      await this.authService.logOut();
      this.router.navigate(['/']);
      const snackBarRef = this.snackBar.open('Come back soon! :)', null, {
        duration: 5000
      });
    } catch (httpError) {
      console.log(httpError);
    }
  }
}

