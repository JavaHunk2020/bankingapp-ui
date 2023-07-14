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
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private sharedService:SharedService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
   
    if(request.url.includes('aws.ctrlmap.com')){
      return next.handle(request);
    }
   
    // let clonedRequest = request.clone({
    //   setHeaders: {
    //     'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbWFuLmJhbnNhbCsxMDBAY29udHJvbG1hcC5pbyIsInNjb3BlcyI6W3siYXV0aG9yaXR5IjoiY3RybG1hcCJ9XSwic3Vic2NyaXB0aW9uU3RhdHVzIjp0cnVlLCJ0ZW5hbnQiOiJjYW1yeSIsImF1dGhUeXBlIjoidXNlciIsImlzcyI6Imh0dHBzOi8vd3d3LmN0cmxtYXAuY29tIiwiaWF0IjoxNjg5MzU3NjQ3LCJleHAiOjE2ODk0NDQwNDd9.GTF92Cpo0BsFKO3x3hSge1qOKFKTahu8wyhl4lj0mewByVNfanky168ipfLvFUz84p_Rea8km1oAt1IDqxbo9w',
    //     'X-TenantURI': 'camry',
    //     'X-AuthProvider': 'cmapjwt',
    //   },
    // });



    return next.handle(request).pipe(
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
