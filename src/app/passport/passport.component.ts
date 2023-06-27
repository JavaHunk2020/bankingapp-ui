import { Component, Input, OnInit,ViewChild ,ElementRef,AfterViewInit} from '@angular/core';
import { Passport } from '../model/passport.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Constant } from 'src/environments/environment';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-passport',
  templateUrl: './passport.component.html',
  styleUrls: ['./passport.component.scss']
})
export class PassportComponent implements OnInit {

  @Input("passport")
  cpassport={} as Passport;

  constructor(private http:HttpClient,private router:Router,private sharedService:SharedService) { }

  ngOnInit(): void {
    
  }

  deletePassport(pid:number):void {
     ///passports/{pid}
      this.http.delete<any>(`${Constant.BASE_URI}/passports/${pid}`)
      .subscribe((data)=> {
          
          this.sharedService.publish("refreshIt");
          this.cpassport={} as Passport;
      });
  }
}
