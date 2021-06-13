import React, { useContext, useState } from 'react';

import { TaskType } from '@types';
import { AppContext } from '@store';
import { useEditTask } from '@hooks';
import { Button } from '@components';

interface TaskTableRowProps {
  task: TaskType;
}

export const TaskTableRow: React.FC<TaskTableRowProps> = ({ task }) => {
  const { state } = useContext(AppContext);
  const { logged } = state.user;
  const { isLoading } = state.tasks;
  const { editTaskStatus, editTaskText, logoutHandler } = useEditTask();
  const [isDone, setIsDone] = useState<boolean>(
    task.status === 10 || task.status === 11
  );
  const [input, setInput] = useState<string>(task.text);
  const [editMode, setEditMode] = useState<boolean>(false);

  const handleCheckboxChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (logged) {
      const token = localStorage.getItem('token');
      if (!token) {
        logoutHandler();
      } else {
        setIsDone(event.target.checked);
        editTaskStatus(task.id, task.status);
      }
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const toggleEditMode = () => setEditMode(!editMode);

  const handleEditText = () => {
    if (logged) {
      const token = localStorage.getItem('token');
      if (!token) {
        logoutHandler();
      } else {
        editTaskText(task.id, input, task.status);
        setEditMode(false);
      }
    }
  };

  return (
    <tr key={task.id}>
      <td>{task.id}</td>
      <td>{task.username}</td>
      <td>{task.email}</td>
      <td>
        <input
          type="text"
          value={input}
          className="task_text"
          onChange={handleInput}
          disabled={!editMode}
        />
        {editMode ? (
          <Button title="Save" onClick={handleEditText} />
        ) : (
          (task.status === 1 || task.status === 11) && <p>Edited</p>
        )}
      </td>
      <td>
        <input
          type="checkbox"
          checked={isDone}
          className="task_status"
          onChange={handleCheckboxChange}
          disabled={isLoading}
        />
        {logged && (
          <span
            className={editMode ? 'edit is-active' : 'edit'}
            onClick={toggleEditMode}
          >
            Edit
          </span>
        )}
      </td>
    </tr>
  );
};
