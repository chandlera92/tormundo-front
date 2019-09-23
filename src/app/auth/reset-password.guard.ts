import {Injectable, OnDestroy} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, NavigationExtras, Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducers';
import * as AuthActions from './store/auth.actions';
import * as UserActions from '../user/store/user.actions';
import {Actions} from '@ngrx/effects';
import {HttpClient} from '@angular/common/http';
import {Globals} from '../globals';

@Injectable()
export class ResetPasswordGuard implements CanActivate, OnDestroy {

  private destroyed$ = new Subject<boolean>();

  constructor(private store: Store<fromApp.AppState>,
              private router: Router,
              private updates$: Actions,
              private http: HttpClient,
              private globals: Globals) {
  }

  /*  checkResetToken(token: string): Observable<any> {
      return this.store
        .do(() => ;
    }*/

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const getToken = next.paramMap.get('token');

    /* TODO: Should this be in an effect? it seems stupid. Should it be in a service? Also stupid? */

    this.http.get<any>(this.globals.checkPasswordReset(getToken))
    /*      .map(res => console.log(res))
          .catch(err:any => console.log(err))*/
      .subscribe(
        data => console.log(data),
        err => console.log(err)
      );

    return true;


    /* this.updates$
       .ofType(AuthActions.CHECK_RESET_PASSWORD_TOKEN_ERROR)
       .takeUntil(this.destroyed$)
       .do((res) => {
         const navigationExtras: NavigationExtras = {
           queryParams: {'expired': true}
         };
         this.router.navigate(['/signin'], navigationExtras);

       })
       .subscribe();

     this.updates$
       .ofType(AuthActions.CHECK_RESET_PASSWORD_TOKEN_SUCCESS)
       .takeUntil(this.destroyed$)
       .do((res: any) => {
         return true;
       })
       .subscribe();*/

  }


  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }


}
