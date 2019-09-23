import {ActionReducerMap, createFeatureSelector, combineReducers} from '@ngrx/store';

import * as fromOrganizationCards from '../organization/display-cards/store/display-cards.reducers';
import * as fromFiles from '../shared/file-upload/store/files.reducers';
import * as fromOrganization from '../organization/store/organization.reducers';

import {Organization} from '../models/organization';
import {AppFile} from '../../core/models/appfile';
import { InjectionToken } from '@angular/core';
import {OrganizationDisplayCard} from '../../core/models/organization-display-card';

export interface OrganizationAdminState {
  organization: Organization;
  displayCards: OrganizationDisplayCard[];
  files: AppFile[];
}

export const reducerToken = new InjectionToken<ActionReducerMap<OrganizationAdminState>>('Reducers');

/*
export const adminReducers: ActionReducerMap<OrganizationAdminState> = {
  organization: fromOrganization.organizationReducer,
  displayCard: fromOrganizationCards.adminDisplayCardReducer
};
*/

export const reducers = combineReducers({
  organization: fromOrganization.organizationReducer,
  displayCards: fromOrganizationCards.adminDisplayCardReducer,
  files: fromFiles.fileReducer
});

export function getReducers() {
  return reducers
}

export const reducerProvider = [
  { provide: reducerToken, useFactory: getReducers }
];

export const getAdminState = createFeatureSelector<OrganizationAdminState>(
  'admin'
);
