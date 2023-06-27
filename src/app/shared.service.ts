import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private data : BehaviorSubject<string> = new BehaviorSubject<string>("TP");

   public  publish(input:string) : void {
         this.data.next(input); 
   }

   public getData(){
      //asObservable - means we will get reference of data
      return this.data.asObservable();
   }
   
}
