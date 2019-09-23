import {CanActivate} from '@angular/router';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

import * as UserActions from '../store/user.actions';
import {catchError, filter, switchMap, tap} from 'rxjs/internal/operators';


@Injectable()
export class AccountGuard implements CanActivate {

  constructor(private store: Store<fromApp.AppState>) {
  }

  getUser(): Observable<any> {
    return this.store
      .select('user')
      .pipe(
        tap((data: any) => {
          if (!data.user) {
            this.store.dispatch(new UserActions.FetchUser());
          }
        }),
        filter((data: any) => {
          return data.user;
        })
      );
  }

  canActivate(): Observable<boolean> {
    return this.getUser()
      .pipe(
        switchMap(() => of(true)),
        catchError(() => of(false))
      );
  }
}
