import {Action} from '@ngrx/store';
import {User} from '../../core/models/user';
import {UserProfile} from '../../core/models/user-profile';

export const FETCH_USER = 'FETCH_USER';
export const SET_USER = 'SET_USER';

export const VERIFY_USER = 'VERIFY_USER';
export const VERIFY_USER_SUCCESS = 'VERIFY_USER_SUCCESS';
export const VERIFY_USER_ERROR = 'VERIFY_USER_ERROR';

export const FETCH_USER_PROFILE = 'FETCH_USER_PROFILE';
export const SET_USER_PROFILE = 'SET_USER_PROFILE';

export class VerifyUser implements Action {
  readonly type = VERIFY_USER;

  constructor(public payload: any) {
  }
}

export class VerifyUserSuccess implements Action {
  readonly type = VERIFY_USER_SUCCESS;

  constructor(public message: string){
  }
}

export class VerifyUserError implements Action {
  readonly type = VERIFY_USER_ERROR;

  constructor(public error: string){
  }
}

export class FetchUser implements Action {
  readonly type = FETCH_USER;
}

export class SetUser implements Action {
  readonly type = SET_USER;

  constructor(public payload: { user: User, profile: UserProfile }) {
  }
}

export class FetchUserProfile implements Action {
  readonly type = FETCH_USER_PROFILE;
}

export class SetUserProfile implements Action {
  readonly type = SET_USER_PROFILE;

  constructor(public payload: UserProfile) {
  }
}

export type UserActions = FetchUser | SetUser | FetchUserProfile | SetUserProfile;
