import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { Signup } from '../model/signup.model';
import { Constant } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Passport } from '../model/passport.model';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
   signups:Signup[]=[]; 
   username:string="";

   passportDetails:Passport={} as Passport;

  constructor(private http:HttpClient,private router:Router) { }

  logout():void {
    localStorage.removeItem('loggedUser');
    this.router.navigate(['auth']);
  }

  ngOnInit(): void {
    //null coalescing
    this.username = localStorage.getItem('loggedUser')??'';
    this.http.get<Signup[]>(`${Constant.BASE_URI}/signups`).subscribe((data:Signup[])=>{
        this.signups=data;
    });
 
  }

  public showPassportDetails(sid:number) : void {
       this.http.get<Passport>(`${Constant.BASE_URI}/signups/${sid}/passport`).subscribe((data:Passport)=>{
       console.log(data);
       this.passportDetails=data;
    });

  }

}
