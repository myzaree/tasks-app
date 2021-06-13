import { TaskType } from '@types';
import { Types, ActionMap } from '../actionTypes';
import { UserActions } from './user-reducer';

type TasksPayload = {
  [Types.SetTasks]: {
    tasks: TaskType[];
    totalTasksCount: number;
  };
  [Types.SetError]: {
    error: string;
  };
  [Types.AddTask]: {
    task: TaskType;
  };
  [Types.EditTask]: {
    id: number;
    text?: string;
    status?: 0 | 1 | 10 | 11;
  };
  [Types.StartLoading]: undefined;
  [Types.SetPage]: {
    page: number;
  };
  [Types.SetSorting]: {
    sort_field: 'id' | 'username' | 'email' | 'status';
    sort_direction: 'asc' | 'desc';
  };
};

export type TasksActions = ActionMap<TasksPayload>[keyof ActionMap<
  TasksPayload
>];

export interface TasksState {
  tasksList: TaskType[];
  isLoading: boolean;
  error: string | null;
  page: number;
  sort_field: null | 'id' | 'username' | 'email' | 'status';
  sort_direction: null | 'asc' | 'desc';
  totalTasksCount: number;
}

export const TasksReducer = (
  state: TasksState,
  action: TasksActions | UserActions
): TasksState => {
  switch (action.type) {
    case Types.SetTasks:
      return {
        ...state,
        isLoading: false,
        tasksList: action.payload.tasks,
        totalTasksCount: action.payload.totalTasksCount,
      };
    case Types.StartLoading:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case Types.SetError:
      return {
        ...state,
        tasksList: [],
        isLoading: false,
        error: action.payload.error,
      };
    case Types.AddTask:
      return {
        ...state,
        tasksList: [action.payload.task, ...state.tasksList].slice(0, 3),
        totalTasksCount: state.totalTasksCount + 1,
      };
    case Types.EditTask:
      return {
        ...state,
        isLoading: false,
        tasksList: state.tasksList.map((task) => {
          const { id, text, status } = action.payload;
          if (task.id === id) {
            return {
              ...task,
              text: text || task.text,
              status: status || task.status,
            };
          }
          return task;
        }),
      };
    case Types.SetPage:
      return {
        ...state,
        page: action.payload.page,
      };
    case Types.SetSorting:
      return {
        ...state,
        sort_field: action.payload.sort_field,
        sort_direction: action.payload.sort_direction,
      };
    default:
      return state;
  }
};
