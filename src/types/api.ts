export type ApiResponse<T1, T2> =
  | {
      status: 'ok';
      message: T1;
    }
  | {
      status: 'error';
      message: T2;
    };
