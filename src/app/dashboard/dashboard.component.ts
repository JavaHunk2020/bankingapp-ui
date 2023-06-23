import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Signup } from '../model/signup.model';
import { Constant } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
   signups:Signup[]=[]; 
   username:string="";
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

}
