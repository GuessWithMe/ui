import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { environment } from '@environment';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.pug',
  styleUrls: ['./landing.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LandingComponent implements OnInit {
  public apiUrl = environment.apiUrl;

  constructor() {}

  ngOnInit() {

  }
}

