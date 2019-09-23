import {Actions, Effect} from '@ngrx/effects';
import {Injectable} from '@angular/core';

import * as UserActions from './user.actions';

import {Router} from '@angular/router';
import {Globals} from '../../globals';
import {HttpClient} from '@angular/common/http';
import {User} from '../../core/models/user';
import {UserProfile} from '../../core/models/user-profile';
import {Observable, of} from 'rxjs';
import {share, switchMap} from 'rxjs/operators';
import {catchError, map} from 'rxjs/internal/operators';

@Injectable()
export class UserEffects {
  @Effect()
  fetchUser = this.actions$
    .ofType(UserActions.FETCH_USER)
    .pipe(
      switchMap((action: UserActions.FetchUser) => {
        return this.http
          .get<any>(this.globals.user)
          .pipe(share());
      }),
      map((data) => {
        console.log(data);
        return {
          type: UserActions.SET_USER,
          payload: {
            user: new User(data.user.email, data.user.country_id, data.user.language_id, data.user.user_name, data.user.verified),
            profile: new UserProfile(
              data.profile.first_name,
              data.profile.last_name,
              data.profile.description,
              data.profile.gravatar,
              data.profile.gravatar_active,
              data.profile.profile_image,
              data.profile.isPublic)
          }
        };
      })
    );

  @Effect()
  fetchUserProfile = this.actions$
    .ofType(UserActions.FETCH_USER_PROFILE)
    .pipe(
      switchMap((action: UserActions.FetchUserProfile) => {
        return this.http
          .get<any>(this.globals.getSelfProfile)
          .pipe(share());
      }),
      map((user) => {
        console.log(user);
        return {
          type: UserActions.SET_USER_PROFILE,
          payload: new UserProfile(user.profile.first_name,
            user.profile.last_name,
            user.profile.description,
            user.profile.gravatar,
            user.profile.gravatar_active,
            user.profile.profile_image,
            user.profile.isPublic)
        };
      })
    );

  @Effect()
  verifyUser = this.actions$
    .ofType(UserActions.VERIFY_USER)
    .pipe(
      switchMap((action: UserActions.VerifyUser) => {
        return of(action)
          .pipe(
            switchMap(() => {
              return this.http
                .post<any>(this.globals.verifyAccount, action.payload)
                .pipe(share());
            }),
            map((res: any) => {
              console.log(res);
              return {
                type: UserActions.VERIFY_USER_SUCCESS,
                message: res.message
              };
            }),
            catchError((err: any) => {
              return of(new UserActions.VerifyUserError(err.error.message));
            })
          );
      })
    );

  constructor(private actions$: Actions,
              private router: Router,
              private globals: Globals,
              private http: HttpClient) {
  }
}
