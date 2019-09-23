/*
import {Actions, Effect} from '@ngrx/effects';
import {Injectable} from '@angular/core';

import * as AdminActions from './admin.actions';
import * as CoreActions from '../../core/store/core.actions';
import * as OrganizationDisplayCardActions from '../organization/display-cards/store/display-cards.actions';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';


import {Globals} from '../../globals';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {MatDialog} from '@angular/material';
import {Action} from '@ngrx/store';
import {Members} from '../models/members';
import {share} from 'rxjs/operators';
import {Organization, OrganizationCard, OrganizationProfile} from '../models/organization';
import {AppFile} from '../../core/models/appfile';
import {OrganizationDisplayCard} from '../../core/models/organization-display-card';
import {GeoLocation} from '../../core/models/geo-location';
import {UpdateOrganizationDisplayCard} from './admin.actions';

@Injectable()
export class AdminEffects {
/!*  @Effect()
  updateOrganizationDisplayCard: Observable<any> = this.actions$
    .ofType(AdminActions.UPDATE_ORGANIZATION_DISPLAY_CARD)
    .map((action: UpdateOrganizationDisplayCard) => {
      return action.payload;
    })
    .switchMap(payload => {
      return this.http
        .patch<any>(this.globals.modifyOrganizationCard(payload.orgName, payload.data.id), payload.data)
        .map((res) => {
          console.log(res);
          return Observable.of(true);
        })
        .catch((err) => {
          console.log(err);
          return Observable.of(new AdminActions.LanguageItemRequestError(err));
        });
    });*!/
  @Effect()
  fetchOrganizationMembers: Observable<Action> = this.actions$
    .ofType(AdminActions.FETCH_ORGANIZATION_MEMBERS)
    .switchMap((action: AdminActions.FetchOrganizationMembers) => {
      console.log('req made');
      return Observable.of(action)
        .switchMap(() => {
          return this.http
            .get<any>(this.globals.getOrganizationMembers(action.payload))
            .pipe(share());
        })
        .map((data: any) => {
          const members = [];
          for (const member of data.members) {
            members.push(new Members(member.id, member.user_name, member.created_by, member.created_at));
          }
          return {
            type: AdminActions.SET_ORGANIZATION_MEMBERS,
            payload: members
          };
        })
        .catch((error: any) => {
          this.router.navigate(['']);
          return Observable.of(new AdminActions.ErrorOrganizationMembers(error.error.message));
        });

    });
  @Effect()
  fetchOrganization: Observable<Action> = this.actions$
    .ofType(AdminActions.FETCH_ORGANIZATION)
    .switchMap((action: AdminActions.FetchOrganization) => {
      return Observable.of(action)
        .switchMap(() => {
          return this.http
            .get<any>(this.globals.getOrganizationAndAccess(action.payload))
            .pipe(share());
        })
        .map((data) => {
          const profiles = [];
          const cards = [];
          const files = [];
          const cardsReal = [];

          const location = data.organization.location[0];
          const geoLocation = new GeoLocation(location.id,
            location.organization_id,
            null,
            location.country,
            location.city,
            location.lat,
            location.lng);

          for (const entry of data.organization.files) {
            files.push(new AppFile(entry.id, entry.name, entry.description, entry.type, entry.loc));
          }

          for (const entry of data.organization.cards) {
            const activeFile = files.find(file => file.id === entry.image);
            cardsReal.push(new OrganizationDisplayCard(
              entry.id,
              data.organization.name,
              entry.description,
              entry.language_id,
              entry.public,
              activeFile !== null ? activeFile : activeFile,
              geoLocation
            ));
          }

          /!*     for (const entry of data.organization.cards) {
                 cards.push(new OrganizationCard(entry.id, entry.language_id, entry.description, null, entry.public));
               }*!/
          for (const entry of data.organization.profiles) {
            profiles.push(new OrganizationProfile(entry.id, entry.language_id, entry.description, entry.public));
          }
          return {
            type: AdminActions.SET_ORGANIZATION,
            payload: {
              organization: new Organization(
                data.organization.id,
                data.organization.name,
                data.organization.language_id,
                profiles, cardsReal, files, geoLocation)
            }
          };
        })
        .catch((error: any) => {
          this.router.navigate(['']);
          /!*    this.dialog.open(DialogComponent, {
                width: '500px',
                data: {message: error.error.message}
              });*!/
          return Observable.of(new AdminActions.AdminError(error));
        })
        .pipe(share());
    });

  @Effect()
  setActiveFile: Observable<Action> = this.actions$
    .ofType(AdminActions.TRY_SET_ACTIVE_FILE)
    .switchMap((action: AdminActions.TrySetActiveFile) => {
      return Observable.of(action)
        .map(() => {
          return {
            type: AdminActions.SET_ACTIVE_FILE,
            payload: action.file
          };
        });
    });

  @Effect()
  addOrganizationFile: Observable<Action> = this.actions$
    .ofType(AdminActions.TRY_ADD_FILE)
    .switchMap((action: AdminActions.TryAddFile) => {
      return Observable.of(action)
        .switchMap(() => {
          return this.http.post<any>(this.globals.addOrganizationFile(action.payload.name), action.payload.data);
        })
        .mergeMap((data: any) => {
          const file = data.organizationFile;
          const activeFile = new AppFile(file.id, file.name, file.description, file.type, file.loc);
          return [
            {
              type: AdminActions.SET_ADD_FILE,
              payload: {
                file: activeFile
              }
            },
            {
              type: AdminActions.SET_ACTIVE_FILE,
              file: activeFile
            }
          ];
        })
        .catch((error: any) => {
          return Observable.of(new AdminActions.AdminError(error));
        });
    });

  constructor(private actions$: Actions,
              private router: Router,
              private globals: Globals,
              private http: HttpClient,
              public dialog: MatDialog) {
  }

}
*/
