import {createSelector} from '@ngrx/store';

import * as fromParent from '../../../store/admin.reducers';
import * as fromReducer from './display-cards.reducers';

export const getDisplayCards = createSelector(
  fromParent.getAdminState,
  (state: fromParent.OrganizationAdminState) => {
    return state.displayCards;
  }
);


/*export const getCard = createSelector(getDisplayCards, res => {
  return res;
});*/
