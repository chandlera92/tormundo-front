import * as UserActions from './user.actions';
import {User} from '../../core/models/user';
import {UserProfile} from '../../core/models/user-profile';

export interface State {
  user: User;
  userProfile: UserProfile;
}

const initialState: State = {
  user: null,
  userProfile: null
};

export function userReducer(state: any = initialState, action) {
  switch (action.type) {
    case UserActions.VERIFY_USER_SUCCESS:
      return {
        ...state
      };
    case UserActions.SET_USER:
      console.log(action.payload);
      return {
        ...state,
        user: action.payload.user,
        userProfile: action.payload.profile
      };
    case UserActions.SET_USER_PROFILE:
      return {
        ...state,
        userProfile: action.payload
      };
    default:
      return state;
  }
}
