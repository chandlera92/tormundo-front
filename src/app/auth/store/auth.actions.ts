import {Action} from '@ngrx/store';


export const SIGNIN = 'SIGNIN';
export const TRY_SIGNIN = 'TRY_SIGNIN';

export const SET_AUTH = 'SET_AUTH';
export const INIT_AUTH = 'INIT_AUTH';
export const LOGOUT = 'LOGOUT';

export const TRY_SIGNUP = 'TRY_SIGNUP';

export const AUTH_ERROR = 'AUTH_ERROR';

export const CHECK_RESET_PASSWORD_TOKEN = 'CHECK_RESET_PASSWORD_TOKEN_SUCCESS';
export const CHECK_RESET_PASSWORD_TOKEN_SUCCESS = 'CHECK_RESET_PASSWORD_TOKEN_SUCCESS';
export const CHECK_RESET_PASSWORD_TOKEN_ERROR = 'CHECK_RESET_PASSWORD_TOKEN_ERROR';

export const TRY_RESET_PASSWORD = 'TRY_RESET_PASSWORD';
export const RESET_PASSWORD = 'RESET_PASSWORD';
export const RESET_PASSWORD_ERROR = 'RESET_PASSWORD_ERROR';

export class CheckResetPasswordToken implements Action {
  readonly type = CHECK_RESET_PASSWORD_TOKEN;

  constructor(token: string) {
  }
}

export class CheckResetPasswordTokenSuccess implements Action {
  readonly type = CHECK_RESET_PASSWORD_TOKEN_SUCCESS;
}

export class CheckResetPasswordTokenError implements Action {
  readonly type = CHECK_RESET_PASSWORD_TOKEN_ERROR;
}

export class Signin implements Action {
  readonly type = SIGNIN;
}

export class AuthError implements Action {
  readonly type = AUTH_ERROR;

  constructor(public payload: any) {
  }
}

export class TrySignin implements Action {
  readonly type = TRY_SIGNIN;

  constructor(public payload: { email: string, password: string }) {
  }
}

export class TrySignUp implements Action {
  readonly type = TRY_SIGNUP;

  constructor(public payload: { email: string, password: string, user_name: string, country_id: number, language_id: number }) {
  }
}

export class SetAuth implements Action {
  readonly type = SET_AUTH;

  constructor(public payload: { user_name: string, token: string, authenticated: boolean }) {
  }
}

export class InitAuth implements Action {
  readonly type = INIT_AUTH;
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export type AuthActions
  =
  AuthError |
  Signin |
  TrySignin |
  SetAuth |
  InitAuth |
  Logout;
