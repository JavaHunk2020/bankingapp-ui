import { Component, Input, OnInit } from '@angular/core';
import { Passport } from '../model/passport.model';

@Component({
  selector: 'app-passport',
  templateUrl: './passport.component.html',
  styleUrls: ['./passport.component.scss']
})
export class PassportComponent implements OnInit {

  @Input("passport")
  cpassport={} as Passport;

  constructor() { }

  ngOnInit(): void {
  }

}
