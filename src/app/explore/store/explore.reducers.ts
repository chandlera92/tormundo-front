import * as ExploreActions from './explore.actions';
import {PublicOrganization} from '../../core/models/organization';

export interface State {
  organizations: PublicOrganization[];
}

const initialState: State = {
  organizations: null
};

export function exporeReducer(state: any = initialState, action) {
  switch (action.type) {
    case (ExploreActions.EXPLORE_SET_ORGANIZATIONS):
      return {
        ...state,
        organizations: action.organizations
      };
    default:
      return state;
  }
}
