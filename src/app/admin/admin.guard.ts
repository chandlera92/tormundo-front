import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducers';
/*
import * as AdminActions from './store/admin.actions';
*/
import * as fromStore from './store/admin.reducers';
import * as fromOrganizationStore from './organization/store/organization.actions';


import {share, filter, tap} from 'rxjs/operators';
import {catchError, switchMap} from 'rxjs/internal/operators';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private store: Store<fromApp.AppState>, private router: Router) {
  }

  getOrganization(organizationName: string): Observable<any> {
    return this.store.select(fromStore.getAdminState)
      .pipe(
        tap((data: any) => {
          this.store.dispatch(new fromOrganizationStore.FetchOrganization(organizationName));
        }),
        filter((data: any) => {
          return data.organization;
        }),
        share()
      );

    /*   return this.store
         .select('admin')
         .do((data: any) => {
           this.store
             .dispatch(new AdminActions.FetchOrganization(organizationName));
         })
         .filter((data: any) => {
           return data.organization;
         })
         .pipe(share());*/
  }

  // TODO: Why isn't error working here?
  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const getParam = next.paramMap.get('organizationName');
    if (getParam) {
      return this.getOrganization(getParam)
        .pipe(
          switchMap(() => of(true)),
          catchError(() => {
            this.router.navigate(['']);
            return of(false);
          }),
          share()
        );
    } else {
      return false;
    }
  }
}
