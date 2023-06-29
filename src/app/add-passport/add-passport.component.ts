import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Passport } from '../model/passport.model';
import { HttpClient } from '@angular/common/http';
import { Constant } from 'src/environments/environment';
import { Observable } from 'rxjs';

interface Magic {
  name:string;
  email:string;
  age?:number;
}



@Component({
  selector: 'app-add-passport',
  templateUrl: './add-passport.component.html',
  styleUrls: ['./add-passport.component.scss']
})
export class AddPassportComponent implements OnInit {
  message:string="";
  passport:Passport={} as Passport;
  constructor(private router:Router,private activatedRoute:ActivatedRoute,private http:HttpClient) { }
   
   magic:Magic={name:'Nagen',email:'nk@gmail.com',age:12}; 

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

  public savePassport() : void {
      console.log(this.passport);
     let  result:Observable<any> = 
     this.http.post(`${Constant.BASE_URI}/passports`,this.passport);
      result.subscribe(data=>{
         this.router.navigate(['/dashboard']);
     });
  }

}
