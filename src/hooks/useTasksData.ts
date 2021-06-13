import { useContext, useEffect } from 'react';

import { AppContext, Types } from '@store';
import { getTasks } from '@services';
import { GetTasksParams, TaskType } from '@types';

export const useTasksData = (): {
  tasksList: TaskType[];
  isLoading: boolean;
  error?: string | null;
} => {
  const { state, dispatch } = useContext(AppContext);
  const {
    tasksList,
    isLoading,
    error,
    page,
    sort_field,
    sort_direction,
  } = state.tasks;

  useEffect(() => {
    (async () => {
      dispatch({ type: Types.StartLoading });
      try {
        let params: GetTasksParams = {
          page,
        };
        if (sort_field) params = { ...params, sort_field };
        if (sort_direction) params = { ...params, sort_direction };
        const { data } = await getTasks(params);
        if (data.status === 'ok') {
          dispatch({
            type: Types.SetTasks,
            payload: {
              tasks: data.message.tasks,
              totalTasksCount: parseInt(data.message.total_task_count, 10),
            },
          });
        } else {
          dispatch({
            type: Types.SetError,
            payload: {
              error: data.message,
            },
          });
        }
      } catch (err) {
        dispatch({
          type: Types.SetError,
          payload: {
            error: err.message,
          },
        });
      }
    })();
  }, [dispatch, page, sort_field, sort_direction]);

  return {
    tasksList,
    isLoading,
    error,
  };
};
