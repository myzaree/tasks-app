import React, { useContext, useEffect, useCallback } from 'react';

import './Snackbar.less';
import { AppContext, Types } from '@store';

export const Snackbar: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const { showSnackbar, displayText, snackbarType } = state.user;

  const closeSnackbar = useCallback(() => {
    dispatch({ type: Types.CloseSnackbar });
  }, [dispatch]);

  useEffect(() => {
    if (showSnackbar) {
      setTimeout(() => {
        closeSnackbar();
      }, 2000);
    }
  }, [showSnackbar, closeSnackbar]);

  return (
    <div className="SnackBarHolder">
      {showSnackbar && (
        <div className="SnackBar">
          <span
            className={snackbarType === 'success' ? 'green-text' : 'red-text'}
          >
            {displayText}
          </span>
          <button type="button" onClick={closeSnackbar}>
            OK
          </button>
        </div>
      )}
    </div>
  );
};
