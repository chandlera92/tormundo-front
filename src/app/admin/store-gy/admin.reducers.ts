/*
import * as AdminActions from './admin.actions';
import {Members} from '../models/members';
import {Organization} from '../models/organization';
import {OrganizationDisplayCard} from '../../core/models/organization-display-card';
import {AppFile} from '../../core/models/appfile';

export interface State {
  organization: Organization;
  members: Members[];
  organizationDisplayCard: OrganizationDisplayCard;
  organizationDisplayCardEdit: OrganizationDisplayCard;
  organizationDisplayCardPreview: OrganizationDisplayCard;
  activeImage: AppFile;
  languageItemError: boolean;
}

const initialState: State = {
  organization: null,
  members: null,
  organizationDisplayCard: null,
  organizationDisplayCardEdit: null,
  organizationDisplayCardPreview: null,
  activeImage: null,
  languageItemError: null
};

export function adminReducer(state: any = initialState, action) {
  switch (action.type) {
    case AdminActions.ADMIN_ERROR:
      return {
        ...state
      };
    case AdminActions.SetActiveFile:
      return {
        ...state,
        activeImage: action.file
      };
    case AdminActions.SET_ORGANIZATION_DISPLAY_CARD:
      return {
        ...state,
        organizationDisplayCard: action.card
      };
    case AdminActions.SET_ORGANIZATION_DISPLAY_CARD_EDIT:
      return {
        ...state,
        organizationDisplayCardEdit: action.card
      };
    case AdminActions.CREATE_ORGANIZATION_DISPLAY_CARD:
      state.organization.cards.push(action.card);
      return {
        ...state
      };
    case AdminActions.SET_ORGANIZATION_DISPLAY_CARD_PREVIEW:
      return {
        ...state,
        organizationDisplayCardPreview: action.card
      };
    case AdminActions.SET_ORGANIZATION:
      return {
        ...state,
        organization: action.payload.organization
      };
    case AdminActions.SET_ORGANIZATION_MEMBERS:
      return {
        ...state,
        members: action.payload
      };
    case AdminActions.SET_ADD_FILE:
      console.log(action.payload);
      console.log(state);
      state.organization.files.push(action.payload);
      return {
        ...state
      };

    default:
      return state;
  }
}
*/
