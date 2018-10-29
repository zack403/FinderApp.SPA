import { catchError } from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs";
import { throwError } from 'rxjs'


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
   
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{

        return next.handle(req).pipe(catchError(error => {
            if(error instanceof HttpErrorResponse){
                  const applicationerror = error.headers.get("Application-Error");
                  if (applicationerror) {
                    return throwError(applicationerror);
                  }
                  const serverError = error.error;
                  let modelStatErrors = '';
                  if (serverError && typeof serverError === 'object') {
                    for (const key in serverError) {
                      if (serverError[key]) {
                        modelStatErrors += serverError[key] + '\n';
                      }
                    }
                  }
                  return throwError(modelStatErrors || serverError || 'Server Error');
            }
        }));
    }
    
}
 export const ErrorInterceptorProvider = {
     provide : HTTP_INTERCEPTORS,
     useClass : ErrorInterceptor,
     multi : true
 };
