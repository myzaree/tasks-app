import { AxiosResponse } from 'axios';

import {
  ApiResponse,
  TaskType,
  GetTasksSuccess,
  GetTasksError,
  GetTasksParams,
  CreateTaskError,
  EditTokenError,
} from '@types';
import { mainClient } from './clients';

export const getTasks = (
  params: GetTasksParams
): Promise<AxiosResponse<ApiResponse<GetTasksSuccess, GetTasksError>>> =>
  mainClient.get<ApiResponse<GetTasksSuccess, GetTasksError>>('/', {
    params,
  });

export const createTask = (
  formData: FormData
): Promise<AxiosResponse<ApiResponse<TaskType, CreateTaskError>>> =>
  mainClient.post('/create', formData);

export const editTask = (
  taskId: number,
  editBody: FormData
): Promise<AxiosResponse<ApiResponse<null, EditTokenError>>> =>
  mainClient.post(`/edit/${taskId}`, editBody);
