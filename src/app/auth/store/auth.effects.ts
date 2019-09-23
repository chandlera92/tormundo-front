import {Actions, Effect} from '@ngrx/effects';
import {Injectable} from '@angular/core';


import * as AuthActions from './auth.actions';
import * as UserActions from '../../user/store/user.actions';


import {from as fromPromise, Observable, of} from 'rxjs';
import {Router} from '@angular/router';
import {Globals} from '../../globals';
import {HttpClient} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Action} from '@ngrx/store';
import {MatDialog} from '@angular/material';
import {DialogComponent} from '../../validation/dialog/dialog.component';
import {VerifyAccountComponent} from '../../validation/verify-account/verify-account.component';
import {catchError, map, switchMap, tap} from 'rxjs/internal/operators';

@Injectable()
export class AuthEffects {
  @Effect()
  checkResetPasswordToken: Observable<Action> = this.actions$
    .ofType(AuthActions.CHECK_RESET_PASSWORD_TOKEN)
    .pipe(
      switchMap((action: AuthActions.CheckResetPasswordToken) => {
        return of(action)
          .pipe(
            switchMap(() => {
              return this.http.get<any>(this.globals.checkPasswordReset(action));
            }),
            map((data) => {
              return {
                type: AuthActions.CHECK_RESET_PASSWORD_TOKEN_SUCCESS
              };
            }),
            catchError((error: any) => {
              return of(new AuthActions.CheckResetPasswordTokenError());
            })
          );
      })
    );

  @Effect()
  authSignin: Observable<Action> = this.actions$
    .ofType(AuthActions.TRY_SIGNIN)
    .pipe(
      switchMap((action: AuthActions.TrySignin) => {
        return of(action)
          .pipe(
            switchMap(() => {
              return this.http.post<any>(this.globals.login, action.payload);
            }),
            map((returnData: { message: string, auth: { token: string, user_name: string, organizations: any, gravatar: string } }) => {
              this.router.navigate(['']);
              localStorage.setItem('organizations', JSON.stringify(returnData.auth.organizations));
              localStorage.setItem('token', returnData.auth.token);
              localStorage.setItem('user_name', returnData.auth.user_name);
              localStorage.setItem('gravatar', returnData.auth.gravatar);
              return {
                type: AuthActions.SET_AUTH,
                payload: {
                  token: returnData.auth.token,
                  user_name: returnData.auth.user_name,
                  authenticated: true,
                  organizations: returnData.auth.organizations,
                  gravatar: returnData.auth.gravatar
                }
              };
            }),
            catchError((error: any) => {
              this.dialog.open(DialogComponent, {
                width: '500px',
                data: {message: error.error.message}
              });
              return of(new AuthActions.AuthError(error));
            })
          );
      })
    );


  @Effect()
  authSignup: Observable<Action> = this.actions$
    .ofType(AuthActions.TRY_SIGNUP)
    .pipe(
      switchMap((action: AuthActions.TrySignUp) => {
        return of(action)
          .pipe(
            switchMap(() => {
              return this.http.post<any>(this.globals.register, action.payload);
            }),
            map((returnData: { message: string, auth: { token: string, user_name: string } }) => {
              this.dialog.open(VerifyAccountComponent, {
                width: '500px'
              });
              localStorage.setItem('token', returnData.auth.token);
              localStorage.setItem('user_name', returnData.auth.user_name);
              return {
                type: AuthActions.SET_AUTH,
                payload: {
                  token: returnData.auth.token,
                  user_name: returnData.auth.user_name,
                  authenticated: true
                }
              };
            }),
            catchError((error: any) => {
              this.dialog.open(DialogComponent, {
                width: '500px',
                data: {message: error.error.message}
              });
              return of(new AuthActions.AuthError(error));
            })
          );
      })
    );
  @Effect()
  initAuth = this.actions$
    .ofType(AuthActions.INIT_AUTH)
    .pipe(
      map((action: AuthActions.InitAuth) => {
        const orgs = localStorage.getItem('organizations');
        let authInfo = {
          user_name: null,
          token: null,
          authenticated: false,
          organizations: null,
          gravatar: null
        };
        if (localStorage.getItem('token')) {
          authInfo = {
            user_name: localStorage.getItem('user_name'),
            token: localStorage.getItem('token'),
            gravatar: localStorage.getItem('gravatar'),
            authenticated: this.jwtHelper.isTokenExpired() === false ? true : false,
            organizations: orgs !== null ? JSON.parse(orgs) : null
          };
        }
        return {
          type: AuthActions.SET_AUTH,
          payload: authInfo
        };
      })
    );
  @Effect({dispatch: false})
    /* TODO: CLEAR STORE AFTER USER */
  authLogout = this.actions$
    .ofType(AuthActions.LOGOUT)
    .pipe(
      switchMap((action: AuthActions.Logout) => {
        return this.http.get<any>(this.globals.logout);
      }),
      tap(() => {
        localStorage.clear();
        this.router.navigate(['/']);
      })
    );

  constructor(public jwtHelper: JwtHelperService,
              private actions$: Actions,
              private router: Router,
              private globals: Globals,
              private http: HttpClient,
              public dialog: MatDialog) {
  }

}
