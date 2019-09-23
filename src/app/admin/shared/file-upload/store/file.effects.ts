import {Actions, Effect} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Globals} from '../../../../globals';
import {MatDialog} from '@angular/material';
import {Action, Store} from '@ngrx/store';


import {FileActionTypes} from './files.actions';
import {getOrganizationState} from '../../../organization/store/organization.selectors';
import * as fromApp from '../../../../store/app.reducers';
import {AppFile} from '../../../../core/models/appfile';
import {map, switchMap, withLatestFrom} from 'rxjs/internal/operators';

@Injectable()
export class FileEffects {
  @Effect()
  addFile: Observable<Action> = this.actions$
    .ofType(FileActionTypes.TRY_ADD_FILE)
    .pipe(
      withLatestFrom(this.store.select(getOrganizationState)),
      switchMap(([action, org]: any) => {
        console.log(action);
        console.log(org);
        return this.http.post<any>(this.globals.addOrganizationFile(org.name), action.file);
      }),
      map((data: any) => {
        const file = data.organizationFile;
        const activeFile = new AppFile(file.id, file.name, file.description, file.type, file.loc);
        return {
          type: FileActionTypes.ADD_FILE_SUCCESS,
          file: activeFile
        };
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
