import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  message:string="";
  
  //Dependency injection in angular ? yes
  constructor(private router:Router,private  httpClient : HttpClient) { 
  }

  ngOnInit(): void {
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
        if(data.code==='success'){
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
