/*
import {ActionReducerMap, combineReducers, createFeatureSelector} from '@ngrx/store';

import * as fromCards from './organization/display-cards/store/display-cards.reducers';
import * as fromOrganization from './organization/organization.reducers';
import {InjectionToken} from '@angular/core';

export interface AdminState {
  admin: {
    organization: fromOrganization.OrganizationAdminState
  }
}

export const reducers = combineReducers({
  organization: fromOrganization.adminOrganizationReducers
});

export const reducerToken = new InjectionToken<ActionReducerMap<AdminState>>('Reducers');

export function getReducers() {
  return {
    admin: reducers
  };
}

export const reducerProvider = [
  {provide: reducerToken, useFactory: getReducers}
];

export const getAdminState = createFeatureSelector<AdminState>(
  'adminState'
);
*/
