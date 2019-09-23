import * as fromFeature from '../../../store/admin.reducers';
import {createSelector} from '@ngrx/store';

export const getFilesState = createSelector(
  fromFeature.getAdminState, (state: fromFeature.OrganizationAdminState) => {
    return state.files;
  }
);
