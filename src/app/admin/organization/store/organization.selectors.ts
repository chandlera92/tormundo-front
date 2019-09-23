import {createSelector} from '@ngrx/store';

import * as fromFeature from '../../store/admin.reducers';
import * as fromOrganization from './organization.reducers';


export const getOrganizationState = createSelector(
  fromFeature.getAdminState, (state: fromFeature.OrganizationAdminState) => {
    return state.organization;
  }
);

export const getOrganizationName = createSelector(
  getOrganizationState,
  (org) => org.name
);
