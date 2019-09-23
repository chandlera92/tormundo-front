import {throwError as observableThrowError, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {MatDialog} from '@angular/material';
import {DialogComponent} from '../../validation/dialog/dialog.component';
import {catchError, map} from 'rxjs/internal/operators';

@Injectable()
export class ErrorInterceptorService implements HttpInterceptor {

  constructor(public dialog: MatDialog) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError((response: any) => {
          if (response instanceof HttpErrorResponse && response.status === 401) {
            /*this.dialog.open(DialogComponent, {
              width: '500px',
              data: {message: response.error.message}
            });*/
          }
          return observableThrowError(response);
        })
      );
  }

}
