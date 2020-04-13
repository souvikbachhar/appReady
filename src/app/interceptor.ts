import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class MyHttpCallInterceptor implements HttpInterceptor {
    secretKey = "souvik";
    
    @BlockUI() blockUI: NgBlockUI;
    constructor(private injector: Injector) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {        
        this.blockUI.start('Loading...'); 
        request = request.clone({
          setHeaders: {
            Authorization: 'Basic ' + btoa('a:a')
          },
          body: CryptoJS.AES.encrypt(JSON.stringify(request.body), this.secretKey.trim()).toString()
        });
         
        //cannot be done on whole body to be done to parameters one by one 
        return next.handle(request)
        .pipe(
            tap(response=>{
                if (response instanceof HttpResponse) {
                  //CryptoJS.AES.decrypt(textToDecrypt, this.secretKey.trim()).toString(CryptoJS.enc.Utf8);
                    this.blockUI.stop();
                }
            }),
            catchError((error: HttpErrorResponse) => {
              let errorMessage = '';
              if (error.error instanceof ErrorEvent) {
                errorMessage = `Error: ${error.error.message}`;
              } else {
                errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
              }
            console.log(errorMessage);
            this.blockUI.stop();
              return throwError(errorMessage);
            })
          );
    }
}