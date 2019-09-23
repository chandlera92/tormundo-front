import {Actions, Effect} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {OrganizationActionTypes} from './organization.actions';
import * as OrganizationA from './organization.actions';

import {Organization, OrganizationProfile} from '../../models/organization';
import {GeoLocation} from '../../../core/models/geo-location';
import {share, switchMap, catchError, tap, mergeMap} from 'rxjs/operators';
import {Action} from '@ngrx/store';
import {Router} from '@angular/router';
import {Globals} from '../../../globals';
import {MatDialog} from '@angular/material';
import {HttpClient} from '@angular/common/http';

import {FileActionTypes} from '../../shared/file-upload/store/files.actions';
import {AppFile} from '../../../core/models/appfile';
import {from, Observable, pipe, of} from 'rxjs';

// import {fromObservable} from 'rxjs/internal/observable/fromObservable';


@Injectable()
export class OrganizationEffects {
  @Effect()
  fetchOrganization: Observable<Action> = this.actions$
    .ofType(OrganizationActionTypes.FETCH_ORGANIZATION)
    .pipe(
      switchMap((action: OrganizationA.FetchOrganization) => {
        return of(action)
          .pipe(
            switchMap(() => {
              return this.http
                .get<any>(this.globals.getOrganizationAndAccess(action.payload))
                .pipe(share());
            }),
            mergeMap((data) => {
              const files = [];

              const location = data.organization.location[0];
              const geoLocation = new GeoLocation(location.id,
                location.organization_id,
                null,
                location.country,
                location.city,
                location.lat,
                location.lng);

              // TODO: This shouldn't happen. Array should be empty if no results exist.

              if (data.organization.files[0] !== null) {
                for (const entry of data.organization.files) {
                  files.push(new AppFile(entry.id, entry.name, entry.description, entry.type, entry.loc));
                }
              }


              return [
                {
                  type: OrganizationActionTypes.SET_ORGANIZATION,
                  payload: {
                    organization: new Organization(
                      data.organization.id,
                      data.organization.name,
                      data.organization.language_id,
                      geoLocation)
                  }
                },
                {
                  type: FileActionTypes.SET_FILES,
                  files: files
                }
              ];
            }),
            /*      .catch((error: any) => {
                    this.router.navigate(['']);
                    /!*    this.dialog.open(DialogComponent, {
                          width: '500px',
                          data: {message: error.error.message}
                        });*!/
                    return Observable.of(new AdminActions.AdminError(error));
                  })*/
            share()
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
