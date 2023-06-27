import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Passport } from '../model/passport.model';

@Component({
  selector: 'app-add-passport',
  templateUrl: './add-passport.component.html',
  styleUrls: ['./add-passport.component.scss']
})
export class AddPassportComponent implements OnInit {
  message:string="";
  passport:Passport={} as Passport;
  constructor(private activatedRoute:ActivatedRoute) { }
  

  ngOnInit(): void {
    ///name=Mohit%20Kumar&email=mohit@gmail.com
    //Reading query parameter values
    // this.activatedRoute.paramMap.subscribe(map=>{
    //      let name= map.get('name');
    //      let email= map.get('email');
         
    // });

    this.activatedRoute.queryParams.subscribe(params => {
        this.passport.name = params['name']??'';
        this.passport.email= params['email']??'';
    });

  }

}
