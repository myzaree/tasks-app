export const formReducer = (
  state: { [key: string]: string },
  event: { name: string; value: string }
): { [key: string]: string } => {
  return {
    ...state,
    [event.name]: event.value,
  };
};
