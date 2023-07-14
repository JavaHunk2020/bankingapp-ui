import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  message:string="";
  
  //Dependency injection in angular ? yes
  constructor(private router:Router,private  httpClient : HttpClient,private sharedService:SharedService) { 
  }

  ngOnInit(): void {
 
    //this.sharedService.getData().subscribe(data=>{
        //if(data==='down'){
         //  this.message="It seems like server rest api is down!!!!!!!!!!"; 
        //}
   // });
  }

  processLogin(username: HTMLInputElement,password: HTMLInputElement) {
     let tusername=username.value;
     let tpassword=password.value;
     //HERE WE HAVE MAKE REST API CALL TO VALIDATE USERNAME AND PASSWORD
     //public class SignupRequest {
      //private String username;
	  //private String password;

     const payload =  {username:tusername,password:tpassword}; 
     const uri="http://localhost:9999/v1/cauth";
   
     let  result:Observable<any> = 
     this.httpClient.post(uri,payload);

     result.subscribe(data=>{
        if(data.code==='success') {
          //After succesful signup
          localStorage.setItem('loggedUser',JSON.stringify(data));
          this.router.navigate(['dashboard']);
        }
        else{
          this.message="Sorry! it seems like your username and password are not correct!";
        }
     });
  }

  clearText() {
    this.message=""; 
  }
   

}
