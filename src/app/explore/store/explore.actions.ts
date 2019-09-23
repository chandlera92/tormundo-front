import {Action} from '@ngrx/store';
import {Organization} from '../../core/models/organization';

export const EXPLORE_TRY_SET_ORGANIZATIONS = 'EXPLORE_TRY_SET_ORGANIZATIONS';
export const EXPLORE_SET_ORGANIZATIONS = 'EXPLORE_SET_ORGANIZATIONS';

export class TrySetOrganizations implements Action {
  readonly type = EXPLORE_TRY_SET_ORGANIZATIONS;
}

export class SetOrganizations implements Action {
  readonly type = EXPLORE_SET_ORGANIZATIONS;

  constructor(public organizations: Organization[]) {
  }
}

export type ExploreActions = TrySetOrganizations | SetOrganizations;
