import React, { createContext, useReducer } from 'react';

import {
  TasksState,
  TasksReducer,
  TasksActions,
  UserState,
  UserReducer,
  UserActions,
} from './reducers';

type InitialStateType = {
  tasks: TasksState;
  user: UserState;
};

const initialState: InitialStateType = {
  tasks: {
    tasksList: [],
    isLoading: false,
    error: null,
    page: 1,
    sort_field: null,
    sort_direction: null,
    totalTasksCount: 0,
  },
  user: {
    logged: !!localStorage.getItem('token'),
    snackbarType: 'success',
    showSnackbar: false,
    displayText: '',
  },
};

const AppContext = createContext<{
  state: InitialStateType;
  dispatch: React.Dispatch<TasksActions | UserActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { tasks, user }: InitialStateType,
  action: TasksActions | UserActions
) => ({
  tasks: TasksReducer(tasks, action),
  user: UserReducer(user, action),
});

interface Props {
  children: React.ReactNode;
}

const AppProvider: React.FC<Props> = ({ children }: Props) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
