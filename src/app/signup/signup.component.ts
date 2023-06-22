import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private httpClient:HttpClient) { }

  ngOnInit(): void {
  }

  doSignup(username:any,email:any,gender:any){
    console.log("username  = "+username.value);
    console.log("email  = "+email.value);
    console.log("gender  = "+gender.value);
    //HERE WE HAVE TO CLASS REST API
    const uri="http://localhost:9999/v1/csignup";
    let queryParam = {username:username.value,email:email.value,gender:gender.value};
    var result:Observable<any> = 
    this.httpClient.post(uri,{},{params:queryParam});
    
    result.subscribe(data=>{
      console.log(data);
    });

  }

}
