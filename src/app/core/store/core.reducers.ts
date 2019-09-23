import * as CoreActions from './core.actions';
import {Country, Language} from '../models/locales';

export interface State {
  countries: Country[];
  languages: Language[];
  currencies: [any];
}

const initialState: State = {
  countries: null,
  languages: null,
  currencies: null
};

export function coreReducer(state: any = initialState, action) {
  switch (action.type) {
    case CoreActions.GET_LOCALES:
      return {
        ...state,
        countries: action.payload.countries,
        languages: action.payload.languages
      };
    default:
      return state;
  }
}
