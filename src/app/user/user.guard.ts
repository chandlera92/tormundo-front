import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {Observable, of} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducers';
import * as UserActions from './store/user.actions';
import {catchError, filter, switchMap, tap} from 'rxjs/internal/operators';


@Injectable()
export class UserGuard implements CanActivate {

  constructor(private store: Store<fromApp.AppState>) {
  }

  getUser(): Observable<any> {
    return this.store
      .select('user')
      .pipe(
        tap((data: { user: any, userProfile: any }) => {
          if (!data.user || !data.userProfile) {
            this.store.dispatch(new UserActions.FetchUser());
          }
        }),
        filter((data) => {
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
