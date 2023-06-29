import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, OnInit, ViewChild,AfterViewInit, AfterViewChecked } from '@angular/core';
import { Signup } from '../model/signup.model';
import { Constant } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Passport } from '../model/passport.model';
import { SharedService } from '../shared.service';
import { PassportComponent } from '../passport/passport.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit,AfterViewInit,AfterViewChecked {
   signups:Signup[]=[]; 
   username:string="";

   passportDetails:Passport={} as Passport;

   @ViewChild("header") 
   header:ElementRef={} as ElementRef;

   @ViewChild(PassportComponent) 
   dpassport:PassportComponent={} as PassportComponent;

  constructor(private http:HttpClient,private router:Router,private sharedService:SharedService) { }

  ngAfterViewInit(): void {
    //throw new Error('Method not implemented.');
    console.log("ngAfterViewInit!!");
    
  }

  ngAfterViewChecked(): void {
    //throw new Error('Method not implemented.');
    console.log("ngAfterViewChecked!!");
    console.log(this.header);
    this.header.nativeElement.innerHTML="Passport Super Details!";
    this.header.nativeElement.style.color="#004eff";
    console.log(this.dpassport);
    console.log(this.dpassport['cpassport']);
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
