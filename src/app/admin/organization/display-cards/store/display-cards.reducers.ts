import {DisplayCardActionTypes} from './display-cards.actions';

import {OrganizationDisplayCard} from '../../../../core/models/organization-display-card';

export function adminDisplayCardReducer(state: any = [], action) {
  switch (action.type) {
    case DisplayCardActionTypes.GET_ORGANIZATION_DISPLAY_CARDS_SUCCESS:
      return {
        ...action.payload
      };
    default:
      return state;
  }
}


