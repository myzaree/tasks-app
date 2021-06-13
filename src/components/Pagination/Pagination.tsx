import React, { useContext } from 'react';

import './Pagination.less';
import { AppContext, Types } from '@store';

export const Pagination: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const { totalTasksCount, page } = state.tasks;
  const totalPages = Math.ceil(totalTasksCount / 3);
  const pagesArray = [];
  for (let i = 1; i <= totalPages; i += 1) {
    pagesArray.push(i);
  }

  const setPageHandler = (newPage: number) => {
    dispatch({ type: Types.SetPage, payload: { page: newPage } });
  };

  return (
    <div className="pagination">
      <div className="pagination__list">
        <button
          type="button"
          className="page"
          disabled={page === 1}
          onClick={() => setPageHandler(page - 1)}
        >
          «
        </button>
        {pagesArray.map((num) => (
          <button
            type="button"
            className={num === page ? 'page active' : 'page'}
            onClick={() => setPageHandler(num)}
            key={`page${num}`}
          >
            {num}
          </button>
        ))}
        <button
          type="button"
          className="page"
          disabled={page === totalPages || totalPages === 0}
          onClick={() => setPageHandler(page + 1)}
        >
          »
        </button>
      </div>
    </div>
  );
};
