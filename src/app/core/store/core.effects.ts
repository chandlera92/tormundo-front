import {Actions, Effect} from '@ngrx/effects';
import {Injectable} from '@angular/core';

import * as CoreActions from './core.actions';

import {Router} from '@angular/router';
import {Globals} from '../../globals';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/internal/operators';

@Injectable()
export class CoreEffects {
  @Effect()
  getLocales = this.actions$
    .ofType(CoreActions.TRY_GET_LOCALES)
    .pipe(
      switchMap((action: CoreActions.TryGetLocales) => {
        return this.http.get<any>(this.globals.getCountriesAndLanguage, {observe: 'body', responseType: 'json'});
      }),
      map((res) => {
        return {
          type: CoreActions.GET_LOCALES, payload: res
        };
      })
    );

  @Effect({dispatch: false})
  addOrganization = this.actions$
    .ofType(CoreActions.TRY_ADD_ORGANIZATION)
    .pipe(
      switchMap((action: CoreActions.TryAddOrganization) => {
        return of(action)
          .pipe(
            switchMap(() => {
              return this.http.post<any>(this.globals.addOrganization, action.payload);
            }),
            map((res: any) => {
              return of(true);
            }),
            catchError((err: any) => {
              return of(false);
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
