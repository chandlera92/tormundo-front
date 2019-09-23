/*
import {Action} from '@ngrx/store';
import {Members} from '../models/members';
import {AppFile} from '../../core/models/appfile';
import {OrganizationDisplayCard} from '../../core/models/organization-display-card';

import * as AdminDisplayCardActions from '../organization/display-cards/store/display-cards.actions';

export const FETCH_ORGANIZATION = 'FETCH_ORGANIZATION';
export const SET_ORGANIZATION = 'SET_ORGANIZATION';

export const FETCH_ORGANIZATION_MEMBERS = 'FETCH_ORGANIZATION_MEMBERS';
export const SET_ORGANIZATION_MEMBERS = 'SET_ORGANIZATION_MEMBERS';
export const ERROR_ORGANIZATION_MEMBERS = 'ERROR_ORGANIZATION_MEMBERS';

export const TRY_ADD_FILE = 'TRY_ADD_FILE';
export const SET_ADD_FILE = 'SET_ADD_FILE';

export const ADMIN_ERROR = 'ADMIN_ERROR';


export const SET_ACTIVE_FILE = 'SET_ACTIVE_FILE';
export const TRY_SET_ACTIVE_FILE = 'TRY_SET_ACTIVE_FILE';

export const SET_ORGANIZATION_DISPLAY_CARD = 'SET_ORGANIZATION_DISPLAY_CARD';
export const SET_ORGANIZATION_DISPLAY_CARD_EDIT = 'SET_ORGANIZATION_DISPLAY_CARD_EDIT';

export const SET_ORGANIZATION_DISPLAY_CARD_PREVIEW = 'SET_ORGANIZATION_DISPLAY_CARD_PREVIEW';


export const UPDATE_ORGANIZATION_DISPLAY_CARD = 'UPDATE_ORGANIZATION_DISPLAY_CARD';
export const SET_ORGANIZATION_DISPLAY_CARDS = 'SET_ORGANIZATION_DISPLAY_CARDS';

export const CREATE_ORGANIZATION_DISPLAY_CARD = 'CREATE_ORGANIZATION_DISPLAY_CARD';

export enum AdminActionTypes {
  ADMIN_LANGUAGE_ITEM_REQUEST_ERROR = '[Admin] Language item error',
  ADMIN_LANGUAGE_ITEM_REQUEST_SUCCESS = '[Admin] Language item success'
}

export class LanguageItemRequestError implements Action {
  readonly type = AdminActionTypes.ADMIN_LANGUAGE_ITEM_REQUEST_ERROR;

  constructor(public payload: any) {
  }
}


export class LanguageItemRequestSuccess implements Action {
  readonly type = AdminActionTypes.ADMIN_LANGUAGE_ITEM_REQUEST_SUCCESS;
}

export class UpdateOrganizationDisplayCard implements Action {
  readonly type = UPDATE_ORGANIZATION_DISPLAY_CARD;

  constructor(public payload: { orgName: string, data: OrganizationDisplayCard }) {
  }
}



export class CreateNewOrganizationDisplayCard implements Action {
  readonly type = CREATE_ORGANIZATION_DISPLAY_CARD;

  constructor(public card: OrganizationDisplayCard) {
  }
}

export class AdminError implements Action {
  readonly type = ADMIN_ERROR;

  constructor(public payload: any) {
  }
}

export class SetActiveFile implements Action {
  readonly type = SET_ACTIVE_FILE;

  constructor(public file: AppFile) {
  }
}

export class TrySetActiveFile implements Action {
  readonly type = TRY_SET_ACTIVE_FILE;

  constructor(public file: AppFile) {
  }
}

export class TryAddFile implements Action {
  readonly type = TRY_ADD_FILE;

  constructor(public payload: any) {
  }
}

export class AddFile implements Action {
  readonly type = SET_ADD_FILE;

  constructor(public payload: any) {
  }
}


export class FetchOrganization implements Action {
  readonly type = FETCH_ORGANIZATION;

  constructor(public payload: string) {
  }
}

export class SetOrganization implements Action {
  readonly type = SET_ORGANIZATION;

  constructor(public payload: any) {
  }
}


export class FetchOrganizationMembers implements Action {
  readonly type = FETCH_ORGANIZATION_MEMBERS;

  constructor(public payload: any) {
  }
}

export class SetOrganizationMembers implements Action {
  readonly type = SET_ORGANIZATION_MEMBERS;

  constructor(public payload: Members[]) {
  }
}

export class ErrorOrganizationMembers implements Action {
  readonly type = ERROR_ORGANIZATION_MEMBERS;

  constructor(public payload: any) {
  }
}


export type AdminActions =
  AdminError |
  FetchOrganization |
  SetOrganization |
  FetchOrganizationMembers |
  SetOrganizationMembers |
  ErrorOrganizationMembers |
  TryAddFile |
  AddFile |
  SetActiveFile |
  TrySetActiveFile |
  UpdateOrganizationDisplayCard |
  CreateNewOrganizationDisplayCard |
  LanguageItemRequestError |
  LanguageItemRequestSuccess;
*/
