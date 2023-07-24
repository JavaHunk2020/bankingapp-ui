import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { SharedService } from './shared.service';
import { Router } from '@angular/router';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private sharedService:SharedService,private router:Router) {

  }

  

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
   
     let clonedRequest = request.clone({
       setHeaders: {
         Authorization: 'Bearer '+ localStorage.getItem("Authorization")
       },
     });

    return next.handle(clonedRequest).pipe(
      tap(
        () => {
          // to fix solar error
        },
        (err: any) => this.processError(err)
      )
    );
   
  }
  
  processError(err: any): void {
    console.log(err);

    if (err instanceof HttpErrorResponse) {
      if (err.status === 401) {
        this.sharedService.publish("Username and password are not correct.");
        this.router.navigate(['auth']);
        return;
      }
      if (err.status === 403) {
        //hey! your are not authorized to delete this record!!!!
       
        return;
      }
      if (err.status === 0) {
        console.log("API IS DOWN!!!!!!!!!!!!!!!!!");
        this.sharedService.publish("down");
        return;
      }
    }
   
  }

}
