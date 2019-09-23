import * as fromAuth from '../auth/store/auth.reducers';
import * as fromCore from '../core/store/core.reducers';
import * as fromUser from '../user/store/user.reducers';
import * as fromExplore from '../explore/store/explore.reducers';
import {ActionReducerMap} from '@ngrx/store';

export interface AppState {
  auth: fromAuth.State;
  user: fromUser.State;
  core: fromCore.State;
  explore: fromExplore.State;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  user: fromUser.userReducer,
  core: fromCore.coreReducer,
  explore: fromExplore.exporeReducer
};
