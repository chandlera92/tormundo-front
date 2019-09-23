import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot, Resolve} from '@angular/router';
import {Observable, of} from 'rxjs';
import {Organization} from '../core/models/organization';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducers';
import * as ExploreActions from './store/explore.actions';
import {filter, take, tap} from 'rxjs/internal/operators';

@Injectable()
export class ExploreResolver implements Resolve<any> {

  constructor(private store: Store<fromApp.AppState>) {
  }

  resolve(): Observable<any> {
    return this.getOrganizations();
  }

  getOrganizations(): Observable<any> {
    return this.store
      .select('explore')
      .pipe(
        tap((data: any) => {
          this.store.dispatch(new ExploreActions.TrySetOrganizations());
        }),
        filter((data) => {
          return data.organizations;
        }),
        take(1)
      );
  }


}
