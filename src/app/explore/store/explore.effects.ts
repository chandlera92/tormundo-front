import {Actions, Effect} from '@ngrx/effects';
import {Injectable} from '@angular/core';

import * as ExploreActions from './explore.actions';

import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material';
import {Globals} from '../../globals';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {Organization, PublicOrganization, PublicOrganizationProfile} from '../../core/models/organization';
import {share} from 'rxjs/operators';
import {catchError, map, switchMap} from 'rxjs/internal/operators';

@Injectable()
export class ExploreEffects {
  @Effect()
  getOrganizations: Observable<Action> = this.actions$
    .ofType(ExploreActions.EXPLORE_TRY_SET_ORGANIZATIONS)
    .pipe(
      switchMap((action: ExploreActions.TrySetOrganizations) => {
        return of(action)
          .pipe(
            switchMap(() => {
              return this.http.get<any>(this.globals.getOrganizations)
                .pipe(share());
            }),
            map((data) => {
              const organizations = [];
              for (const entry of data.organizations) {
                const profiles = [];
                for (const profile of entry.organization_profiles) {
                  profiles.push(new PublicOrganizationProfile(profile.description, profile.cover_image, profile.language_id));
                }
                organizations.push(new PublicOrganization(entry.name, parseFloat(entry.lat), parseFloat(entry.lng), profiles));
              }
              return {
                type: ExploreActions.EXPLORE_SET_ORGANIZATIONS,
                organizations: organizations
              };
            }),
            catchError((error: any) => {
              return of(error);
            })
          );
      })
    );

  constructor(private actions$: Actions,
              private router: Router,
              private globals: Globals,
              private http: HttpClient,
              public dialog: MatDialog) {
  }
}
