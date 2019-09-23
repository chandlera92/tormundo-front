// import actions
import * as AuthActions from './auth.actions';


export interface State {
  gravatar: string;
  token: string;
  user_name: string;
  authenticated: boolean;
  organizations: [{ id: number, name: string }];
}

const initialState: State = {
  gravatar: null,
  token: null,
  user_name: null,
  authenticated: false,
  organizations: null
};


export function authReducer(state: any = initialState, action) {
  switch (action.type) {
    case (AuthActions.SET_AUTH):
      return {
        ...state,
        token: action.payload.token,
        user_name: action.payload.user_name,
        authenticated: action.payload.authenticated,
        organizations: action.payload.organizations,
        gravatar: action.payload.gravatar
      };
    case (AuthActions.LOGOUT):
      return {
        ...state,
        token: null,
        user_name: null,
        authenticated: false
      };
    case (AuthActions.AUTH_ERROR):
      return {
        ...state
      };
    default:
      return state;
  }
}
