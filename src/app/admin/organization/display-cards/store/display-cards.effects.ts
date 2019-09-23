import {Actions, Effect} from '@ngrx/effects';
import {Injectable} from '@angular/core';

import {
  DisplayCardActionTypes, TryGetOrganizationDisplayCards, UpdateOrganizationDisplayCard,
  UpdateOrganizationDisplayCardSuccess
} from './display-cards.actions';

import {Globals} from '../../../../globals';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {MatDialog, MatDialogRef} from '@angular/material';
import * as fromApp from '../../../../store/app.reducers';
import {Store} from '@ngrx/store';

import * as organizationSelectors from '../../store/organization.selectors';
import {getFilesState} from '../../../shared/file-upload/store/files.selectors';
import {OrganizationDisplayCard} from '../../../../core/models/organization-display-card';
import {getOrganizationState} from '../../store/organization.selectors';
import {map, switchMap, withLatestFrom} from 'rxjs/internal/operators';


@Injectable()
export class OrganizationAdminDisplayCardEffects {
  @Effect()
  getOrganizationDisplayCards: Observable<any> = this.actions$
    .ofType(DisplayCardActionTypes.TRY_GET_ORGANIZATION_DISPLAY_CARDS)
    .pipe(
      withLatestFrom(this.store.select(getOrganizationState)),
      switchMap(([action, org]: any) => {
        console.log(org)
        return this.http.get<any>(this.globals.adminGetOrganizationCards(org.id));
      }),
      //withLatestFrom(this.store.select(getFilesState), this.store.select(getOrganizationState)),
      map((data) => {
        console.log(data);
        let formatCards = [];
        for (let entry of data) {
          // const activeFile = files.find(file => file.id === entry.image);
          formatCards.push(new OrganizationDisplayCard(
            entry.id,
            'tormundo',
            //org.name,
            entry.description,
            entry.language_id,
            entry.public,
            null,
            null
            //org.location
          ));
        }
        return {
          type: DisplayCardActionTypes.GET_ORGANIZATION_DISPLAY_CARDS_SUCCESS,
          payload: formatCards
        };
      })
    );

  @Effect()
  updateOrganizationDisplayCard: Observable<any> = this.actions$
    .ofType(DisplayCardActionTypes.UPDATE_ORGANIZATION_DISPLAY_CARD)
    .pipe(
      map((action: UpdateOrganizationDisplayCard) => {
        return action.payload;
      }),
      switchMap(payload => {
        const modifyData = {
          description: payload.data.description,
          image: payload.data.file.id,
          public: payload.data.isPublic
        };
        return this.http
          .patch<any>(this.globals.modifyOrganizationCard(payload.orgName, payload.data.id), modifyData)
          .pipe(
            map((res) => {
              this.dialog.getDialogById('languageNavigateDialog')
                .close({
                  item: payload.data
                });
              /*  this.navigateAwayRef.close({
                  item: payload.data
                });*/
              return new UpdateOrganizationDisplayCardSuccess(res);
            })
          );
        /*      .catch((err) => {
                console.log(err);
                return Observable.of(new AdminActions.AdminError(err));
              });*/
      })
    );

  constructor(private actions$: Actions,
              private router: Router,
              private globals: Globals,
              private http: HttpClient,
              public dialog: MatDialog,
              private store: Store<fromApp.AppState>) {
  }

}
