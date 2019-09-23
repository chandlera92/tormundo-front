import {Action} from '@ngrx/store';

export const GET_LOCALES = 'GET_LOCALES';
export const TRY_GET_LOCALES = 'TRY_GET_LOCALES';

export const TRY_ADD_ORGANIZATION = 'TRY_ADD_ORGANIZATION';

export const HTTP_ERROR = 'HTTP_ERROR';

export class HttpError implements Action {
  readonly type = HTTP_ERROR;
}

export class GetLocales implements Action {
  readonly type = GET_LOCALES;
}

export class TryGetLocales implements Action {
  readonly type = TRY_GET_LOCALES;
}

export class TryAddOrganization implements Action {
  readonly type = TRY_ADD_ORGANIZATION;

  constructor(public payload: any) {
  }
}

export type CoreActions =
  GetLocales | TryGetLocales | TryAddOrganization | HttpError;
