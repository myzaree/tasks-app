import { FC, ReactElement, useMemo, useContext } from 'react';

import { AppContext, Types } from '@store';
import { mainClient } from './clients';

interface InterceptorsWrapperProps {
  children: ReactElement;
}

export const InterceptorsWrapper: FC<InterceptorsWrapperProps> = ({
  children,
}: InterceptorsWrapperProps) => {
  const { dispatch } = useContext(AppContext);

  useMemo(() => {
    mainClient.interceptors.request.use(
      (request) => {
        return request;
      },
      (error) => {
        dispatch({
          type: Types.ShowSnackbar,
          payload: {
            displayText: error.message,
            type: 'error',
          },
        });
        return Promise.reject(error);
      }
    );
    mainClient.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        dispatch({
          type: Types.ShowSnackbar,
          payload: {
            displayText: error.message,
            type: 'error',
          },
        });
        return Promise.reject(error);
      }
    );
  }, [dispatch]);

  return children;
};
