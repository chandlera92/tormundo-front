import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable, of, Subject} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromApp from '../../../store/app.reducers';

@Injectable()
export class MembersGuard implements CanActivate {

  constructor(private store: Store<fromApp.AppState>, private router: Router) {
  }

/*  getMembers(organizationName: string): Observable<any> {
    /!*return this.store
      .select('admin')
      .do((data: any) => {
        this.store.dispatch(new AdminActions.FetchOrganizationMembers(organizationName));
      })
      .filter((data: any) => {
        if (data.members) {
          return true;
        }
      })
      .take(1);*!/
  }*/

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const getParam = next.parent.parent.paramMap.get('organizationName');

    // const getMembers = this.getMembers(getParam);
    /*    const subject = new Subject<any>();
        getMembers.subscribe(
          (res) => {
            console.log(res)
            subject.next(true);
          }
        );

        console.log(subject.asObservable());

        return subject.asObservable().first();*/
    /*if (getParam) {
      return this.getMembers(getParam)
        .switchMap(() => {
          return of(true);
        })
        .catch(() => {
          this.router.navigate(['']);
          return of(false);
        })
        .take(1);
    } else {
      return false;
    }*/
    return true
  }
}
