import {Action} from '@ngrx/store';
import {AppFile} from '../../../../core/models/appfile';

export enum FileActionTypes {
  FETCH_FILES = '[Admin] Fetch admin files',
  SET_FILES = '[Admin] Set admin files',
  TRY_ADD_FILE = '[Admin] Add admin file',
  ADD_FILE_SUCCESS = '[Admin] Admin file success'
}

export class FetchFiles implements Action {
  readonly type = FileActionTypes.FETCH_FILES;
}

export class SetFiles implements Action {
  readonly type = FileActionTypes.SET_FILES;

  constructor(public files: AppFile[]) {
  }
}

export class TryAddFile implements Action {
  readonly type = FileActionTypes.TRY_ADD_FILE;

  constructor(public file: any) {
  }
}

export class AddFileSuccess implements Action {
  readonly type = FileActionTypes.ADD_FILE_SUCCESS;

  constructor(public file: AppFile) {
  }
}

export type FilesActions = FetchFiles | SetFiles | TryAddFile | AddFileSuccess
