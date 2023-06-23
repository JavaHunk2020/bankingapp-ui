import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Constant } from 'src/environments/environment';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private httpClient:HttpClient,private router:Router) { }

  ngOnInit(): void {
  }

  doSignup(username:any,email:any,gender:any){
    console.log("username  = "+username.value);
    console.log("email  = "+email.value);
    console.log("gender  = "+gender.value);
    //HERE WE HAVE TO CLASS REST API
    const uri=`${Constant.BASE_URI}/csignup`;
    let queryParam = {username:username.value,email:email.value,gender:gender.value};
    //URI= API URI
    //{} = request body payload
    //{params:queryParam} = sending data as parameter
    var result:Observable<any> = 
    this.httpClient.post(uri,{},{params:queryParam});
    
    result.subscribe(data=>{
      console.log(data);
         this.router.navigate(['auth']);
    });

  }

}
