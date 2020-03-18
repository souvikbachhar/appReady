import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { NgBlockUI, BlockUI } from 'ng-block-ui';


@Injectable()
export class MyHttpCallInterceptor implements HttpInterceptor {
    @BlockUI() blockUI: NgBlockUI;
    constructor(private injector: Injector) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {        
        //console.log('Intercepted request' + request.url);
        this.blockUI.start('Loading...'); 
        // const authReq = request.clone({ headers: new HttpHeaders({
        //   'Content-Type':  'application/json',
        //   'Authorization': 'Basic ' + btoa('a:a')
        // })
        //     });

        return next.handle(request)
        .pipe(
            tap(response=>{
                if (response instanceof HttpResponse) {
                   // console.log(response.body);
                    this.blockUI.stop();
                }
            }),
            catchError((error: HttpErrorResponse) => {
              let errorMessage = '';
              if (error.error instanceof ErrorEvent) {
                // client-side error
                errorMessage = `Error: ${error.error.message}`;
              } else {
                // server-side error
                errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
              }
            //  window.alert(errorMessage);
            console.log(errorMessage);
            this.blockUI.stop();
              return throwError(errorMessage);
            })
          );
    }
}