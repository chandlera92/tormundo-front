import {AppFile} from '../../../../core/models/appfile';
import {FileActionTypes} from './files.actions';


const initialState: AppFile[] = [];

export function fileReducer(state: any = initialState, action) {
  switch (action.type) {
    case FileActionTypes.SET_FILES:
      return action.files;
    case FileActionTypes.ADD_FILE_SUCCESS:
      state.push(action.file);
      return state;
    default:
      return state;
  }
}
