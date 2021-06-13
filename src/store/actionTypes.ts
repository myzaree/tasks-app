export enum Types {
  StartLoading = 'START_LOADING',
  SetTasks = 'SET_TASKS',
  SetError = 'SET_ERROR',
  AddTask = 'ADD_TASK',
  EditTask = 'EDIT_TASK',
  SetPage = 'SET_PAGE',
  SetSorting = 'SET_SORTING',
  Login = 'LOGIN',
  Logout = 'LOGOUT',
  ShowSnackbar = 'SHOW_SNACKBAR',
  CloseSnackbar = 'CLOSE_SNACKBAR',
}

// eslint-disable-next-line
export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};
