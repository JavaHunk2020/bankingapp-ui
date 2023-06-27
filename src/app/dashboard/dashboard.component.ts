import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, OnInit, ViewChild,AfterViewInit, AfterViewChecked } from '@angular/core';
import { Signup } from '../model/signup.model';
import { Constant } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Passport } from '../model/passport.model';
import { SharedService } from '../shared.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit,AfterViewInit,AfterViewChecked {
   signups:Signup[]=[]; 
   username:string="";

   passportDetails:Passport={} as Passport;

   @ViewChild("dpassport") 
   dpassport:ElementRef<any>={} as ElementRef<any>;

  constructor(private http:HttpClient,private router:Router,private sharedService:SharedService) { }

  ngAfterViewInit(): void {
    //throw new Error('Method not implemented.');
    console.log("ngAfterViewInit!!");
    console.log(this.dpassport.nativeElement);
  }

  ngAfterViewChecked(): void {
    //throw new Error('Method not implemented.');
    console.log("ngAfterViewChecked!!");
    console.log(this.dpassport.nativeElement);
  }


  logout():void {
    localStorage.removeItem('loggedUser');
    this.router.navigate(['auth']);
  }

  ngOnInit(): void {
    console.log("ng oninit method is called");
    //null coalescing
    this.username = localStorage.getItem('loggedUser')??'';
  
    this.sharedService.getData().subscribe(input=>{
          if(input==='refreshIt') {
              this.fetch();
         }
    });
     this.fetch();
  }

  fetch():void {
     this.http.get<Signup[]>(`${Constant.BASE_URI}/signups`).subscribe((data:Signup[])=>{
           this.signups=data;
}    );
  }

  public showPassportDetails(sid:number) : void {
       this.http.get<Passport>(`${Constant.BASE_URI}/signups/${sid}/passport`).subscribe((data:Passport)=>{
      // console.log(data);
       this.passportDetails=data;
    });

  }

}
