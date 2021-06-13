import { Types, ActionMap } from '../actionTypes';
import { TasksActions } from './tasks-reducer';

type UserPayload = {
  [Types.Login]: undefined;
  [Types.Logout]: undefined;
  [Types.ShowSnackbar]: {
    displayText: string;
    type: 'success' | 'error';
  };
  [Types.CloseSnackbar]: undefined;
};

export type UserActions = ActionMap<UserPayload>[keyof ActionMap<UserPayload>];

export interface UserState {
  logged: boolean;
  showSnackbar: boolean;
  displayText: string;
  snackbarType: 'success' | 'error';
}

export const UserReducer = (
  state: UserState,
  action: UserActions | TasksActions
): UserState => {
  switch (action.type) {
    case Types.Login:
      return {
        ...state,
        logged: true,
      };
    case Types.Logout:
      localStorage.removeItem('token');
      return {
        ...state,
        logged: false,
      };
    case Types.ShowSnackbar:
      return {
        ...state,
        showSnackbar: true,
        displayText: action.payload.displayText,
        snackbarType: action.payload.type,
      };
    case Types.CloseSnackbar:
      return {
        ...state,
        showSnackbar: false,
      };
    default:
      return state;
  }
};
