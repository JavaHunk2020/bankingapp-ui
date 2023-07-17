import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, OnInit, ViewChild,AfterViewInit, AfterViewChecked } from '@angular/core';
import { Signup } from '../model/signup.model';
import { Constant } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Passport } from '../model/passport.model';
import { SharedService } from '../shared.service';
import { PassportComponent } from '../passport/passport.component';
import { UserAuthService } from '../services/user.auth.service';
import { CreditCard } from '../model/credit.card';


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
  
  constructor(private userAuthService:UserAuthService,private http:HttpClient,private router:Router,private sharedService:SharedService) { }

  ngAfterViewInit(): void {
    //throw new Error('Method not implemented.');
    console.log("ngAfterViewInit!!");
    
  }

  applyCreditCard(signup:Signup){
    this.router.navigate(['applyCreditCard'],{"queryParams":{name:signup.name,email:signup.email,sid:signup.sid}});
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


    public showCards(){
      this.router.navigate(["availableCreditCards"]);
    }


  logout():void {
    localStorage.removeItem('loggedUser');
    this.router.navigate(['auth']);
  }

  ngOnInit(): void {
    console.log("ng oninit method is called");
    //null coalescing
    this.username = this.userAuthService.getEmail();
  
    this.sharedService.getData().subscribe(input=>{
          if(input==='refreshIt') {
              this.fetch();
         }
    });
     this.fetch();
  }

  fetch():void {
   
    let urole = this.userAuthService.getRole();
    let email = this.userAuthService.getEmail();
     this.http.get<Signup[]>(`${Constant.BASE_URI}/signups`,{params:{role:urole,email:email}}).subscribe((data:Signup[])=>{
           this.signups=data;
           this.signups=this.signups.map(signup=> {
            let crediCardUrl=`${Constant.BASE_URI}/creditcards/photo?email=${signup.email}`;
                signup.crediCardUrl=crediCardUrl;
               return signup;
           });
}    );
  }

  public showPassportDetails(sid:number) : void {
       this.http.get<Passport>(`${Constant.BASE_URI}/signups/${sid}/passport`).subscribe((data:Passport)=>{
      // console.log(data);
       this.passportDetails=data;
    });

  }

  public creditCardDetails(signup:Signup): void {
      localStorage.setItem('username',signup.name);
      this.router.navigate(['approveRejectCreditCard',signup.applicationId]);
     
    //});
  }

  generateCard(signup:Signup) : void {
     var curDate=new Date();
     let creditCardGenerateURI=`${Constant.BASE_URI}/creditcards/generate?email=${signup.email}&name=${signup.name}&doe=${curDate}`;
     signup.creditCardImageUri=creditCardGenerateURI;
  }

}
