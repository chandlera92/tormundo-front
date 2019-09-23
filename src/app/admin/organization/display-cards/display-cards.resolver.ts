import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve} from '@angular/router';
import {Observable, of} from 'rxjs';
import * as fromApp from '../../../store/app.reducers';
import {Store} from '@ngrx/store';

import * as DisplayCardActions from './store/display-cards.actions';
import {getDisplayCards} from './store/display-cards.selectors';
import {getOrganizationState} from '../store/organization.selectors';
import {Organization} from '../../models/organization';
import {catchError, filter, map, switchMap, take, tap} from 'rxjs/internal/operators';

@Injectable()
export class DisplayCardsResolver implements Resolve<any> {

  constructor(private store: Store<fromApp.AppState>) {
  }

  resolve(): Observable<any> {
    return this.waitForDisplayCards()
      .pipe(
        switchMap(() => of(true)),
        catchError(() => of(false))
      );
  }

  waitForDisplayCards(): Observable<any> {
    return this.store
      .select(getDisplayCards)
      .pipe(
        tap(data => {
            this.store.dispatch(new DisplayCardActions.TryGetOrganizationDisplayCards());
        }),
        filter((data: any) => {
          console.log('filter!!!');
          console.log(data);
          return !!data;
        }),
        take(1)
      );
  }


}
