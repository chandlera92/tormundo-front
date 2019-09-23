import {Organization} from '../../models/organization';
import {OrganizationActionTypes} from './organization.actions';

/*export interface OrganizationState {
  organization: Organization;
}
*/

const initialState: Organization = null;

export function organizationReducer(state: any = initialState, action) {
  switch (action.type) {
    case OrganizationActionTypes.SET_ORGANIZATION:
      return action.payload.organization;
    default:
      return state;
  }
}


const object = {
  organization: {},
  organizationDisplayCards: [{}]
};

const state = {
  auth: {},
  admin: {
    organization: {},
    basic: {},
    displayCards: [{}],
    members: [{}],
    accounts: [{}],
    projects: [{}],
    activeProject: {
      basic: {},
      displayCards: [{}],
      profiles: [{}],
      members: [{}]
    }
  }
};
