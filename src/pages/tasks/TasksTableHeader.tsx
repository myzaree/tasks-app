import React, { useContext } from 'react';

import { AppContext, Types } from '@store';

export const TasksTableHeader: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const { sort_field, sort_direction } = state.tasks;

  const arrowIcon = (
    <span className="arrow-icon">{sort_direction === 'asc' ? '↑' : '↓'}</span>
  );

  const handleSortings = (
    sortField: 'id' | 'username' | 'email' | 'status'
  ): void => {
    dispatch({
      type: Types.SetSorting,
      payload: {
        sort_field: sortField,
        sort_direction: sort_direction === 'asc' ? 'desc' : 'asc',
      },
    });
  };

  return (
    <thead>
      <tr>
        <th onClick={() => handleSortings('id')}>
          ID {sort_field === 'id' && arrowIcon}
        </th>
        <th onClick={() => handleSortings('username')}>
          Username {sort_field === 'username' && arrowIcon}
        </th>
        <th onClick={() => handleSortings('email')}>
          Email {sort_field === 'email' && arrowIcon}
        </th>
        <th className="disabled">Text</th>
        <th onClick={() => handleSortings('status')}>
          Status {sort_field === 'status' && arrowIcon}
        </th>
      </tr>
    </thead>
  );
};
