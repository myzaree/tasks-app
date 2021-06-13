import { useContext } from 'react';

import { AppContext, Types } from '@store';
import { Status } from '@types';
import { editTask } from '@services';

export const useEditTask = (): {
  editTaskStatus: (taskId: number, oldStatus: Status) => Promise<void>;
  editTaskText: (
    taskId: number,
    newText: string,
    oldStatus: Status
  ) => Promise<void>;
  logoutHandler: () => void;
} => {
  const { state, dispatch } = useContext(AppContext);
  const { logged } = state.user;

  const logoutHandler = () => {
    dispatch({ type: Types.Logout });
    dispatch({
      type: Types.ShowSnackbar,
      payload: {
        displayText: 'Authentification failed. Please login.',
        type: 'error',
      },
    });
    localStorage.removeItem('token');
  };

  const editTaskStatus = async (taskId: number, oldStatus: Status) => {
    try {
      const token = localStorage.getItem('token');
      if (token && logged) {
        let newStatus: Status = 0;
        if (oldStatus === 0) newStatus = 10;
        else if (oldStatus === 1) newStatus = 11;
        else if (oldStatus === 10) newStatus = 0;
        else if (oldStatus === 11) newStatus = 1;
        const editForm = new FormData();
        editForm.append('status', newStatus.toString());
        editForm.append('token', token);
        dispatch({ type: Types.StartLoading });
        const result = await editTask(taskId, editForm);
        if (result.data && result.data.status === 'ok') {
          dispatch({
            type: Types.EditTask,
            payload: {
              id: taskId,
              status: newStatus,
            },
          });
          dispatch({
            type: Types.ShowSnackbar,
            payload: {
              displayText: 'Task successfully updated!',
              type: 'success',
            },
          });
        } else if (result.data && result.data.message.token) {
          logoutHandler();
        }
      }
    } catch (err) {
      dispatch({
        type: Types.ShowSnackbar,
        payload: {
          displayText: err.message,
          type: 'error',
        },
      });
    }
  };

  const editTaskText = async (
    taskId: number,
    newText: string,
    oldStatus: Status
  ) => {
    try {
      const token = localStorage.getItem('token');
      if (token && logged) {
        let newStatus: Status = oldStatus;
        if (oldStatus === 0) newStatus = 1;
        if (oldStatus === 10) newStatus = 11;
        const editForm = new FormData();
        editForm.append('text', newText);
        editForm.append('status', newStatus.toString());
        editForm.append('token', token);
        dispatch({ type: Types.StartLoading });
        const result = await editTask(taskId, editForm);
        if (result.data && result.data.status === 'ok') {
          dispatch({
            type: Types.EditTask,
            payload: {
              id: taskId,
              text: newText,
              status: newStatus,
            },
          });
          dispatch({
            type: Types.ShowSnackbar,
            payload: {
              displayText: 'Task successfully updated!',
              type: 'success',
            },
          });
        } else if (result.data && result.data.message.token) {
          logoutHandler();
        }
      }
    } catch (err) {
      dispatch({
        type: Types.ShowSnackbar,
        payload: {
          displayText: err.message,
          type: 'error',
        },
      });
    }
  };

  return {
    editTaskStatus,
    editTaskText,
    logoutHandler,
  };
};
