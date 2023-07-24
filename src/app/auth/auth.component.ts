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

  private foo:[id:number,name:string]=[10,"Nagendra"];
  private arr:Array<{id:number,name:string}> =[{id:100,name:"Nagendra"},{id:200,name:"Amisha"}];

  message:string="";
  
  //Dependency injection in angular ? yes
  constructor(private router:Router,private  httpClient : HttpClient,private sharedService:SharedService) { 
    console.log("OMG!!"+this.foo);
    console.log("0 = "+this.foo[0]);
    console.log("1 = "+this.foo[1]);
    console.log("2 = "+this.arr[0]);
    console.log("3 = "+this.arr[1]);
  }

  ngOnInit(): void {
    this.sharedService.getData().subscribe(data=>{
        this.message=data;
    });
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
        if(data.authorization) {
          //After succesful signup
          localStorage.setItem('loggedUser',JSON.stringify(data));
          localStorage.setItem("Authorization",data.authorization)
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
