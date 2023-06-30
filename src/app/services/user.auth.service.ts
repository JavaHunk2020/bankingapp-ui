import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class UserAuthService{

     public constructor(){

     }

     public getEmail():string {
        if(localStorage.getItem('loggedUser')==null){
            return null || '';
        }else{
            return JSON.parse(localStorage.getItem('loggedUser') || '').email;
        }
       
     }

     public getName():string {
        if(localStorage.getItem('loggedUser')==null){
            return null || '';
        }else{
            return JSON.parse(localStorage.getItem('loggedUser') || '').name;
        }
     }

     public getRole():string {
        if(localStorage.getItem('loggedUser')==null){
            return null || '';
        }else{
            return JSON.parse(localStorage.getItem('loggedUser') || '').role;
        }
     }
}