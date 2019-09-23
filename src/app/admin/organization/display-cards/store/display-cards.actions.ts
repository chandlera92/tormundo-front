import {Action} from '@ngrx/store';
import {OrganizationDisplayCard} from '../../../../core/models/organization-display-card';


export enum DisplayCardActionTypes {
  TRY_GET_ORGANIZATION_DISPLAY_CARDS = '[OrganizationDisplayCard] Try get organization display cards.',
  GET_ORGANIZATION_DISPLAY_CARDS_SUCCESS = '[OrganizationDisplayCard] Successfully retrieved organization display cards.',
  UPDATE_ORGANIZATION_DISPLAY_CARD = '[OrganizationDisplayCard] Update organization display card',
  UPDATE_ORGANIZATION_DISPLAY_CARD_SUCCESS = '[OrganizationDisplayCard] Update organization display card success'
}

export class TryGetOrganizationDisplayCards implements Action {
  readonly type = DisplayCardActionTypes.TRY_GET_ORGANIZATION_DISPLAY_CARDS;
}

export class GetOrganizationDisplayCardsSuccess implements Action {
  readonly type = DisplayCardActionTypes.GET_ORGANIZATION_DISPLAY_CARDS_SUCCESS;

  constructor(public payload: any) {
    console.log(payload);
  }
}

export class UpdateOrganizationDisplayCard implements Action {
  readonly type = DisplayCardActionTypes.UPDATE_ORGANIZATION_DISPLAY_CARD;

  constructor(public payload: { orgName: string, data: OrganizationDisplayCard }) {
  }
}

export class UpdateOrganizationDisplayCardSuccess implements Action {
  readonly type = DisplayCardActionTypes.UPDATE_ORGANIZATION_DISPLAY_CARD_SUCCESS;

  constructor(public payload: any) {
  }
}

export type AdminDisplayCardActions =
  TryGetOrganizationDisplayCards |
  GetOrganizationDisplayCardsSuccess |
  UpdateOrganizationDisplayCard |
  UpdateOrganizationDisplayCardSuccess;
