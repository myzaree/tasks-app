import { AxiosResponse } from 'axios';

import { LoginSuccess, LoginError, ApiResponse } from '@types';
import { mainClient } from './clients';

export const login = (
  loginBody: FormData
): Promise<AxiosResponse<ApiResponse<LoginSuccess, LoginError>>> =>
  mainClient.post('/login', loginBody);
