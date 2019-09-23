import {Action} from '@ngrx/store';

export enum OrganizationActionTypes {
  FETCH_ORGANIZATION = '[Organization] Fetch organization',
  SET_ORGANIZATION = '[Organization] Set organization'
}

export class FetchOrganization implements Action {
  readonly type = OrganizationActionTypes.FETCH_ORGANIZATION;

  constructor(public payload: string) {
  }
}

export class SetOrganization implements Action {
  readonly type = OrganizationActionTypes.SET_ORGANIZATION;

  constructor(public payload: any) {
  }
}

export type OrganizationActions = FetchOrganization | SetOrganization
