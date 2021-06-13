import React, { useState } from 'react';

import './Tasks.less';
import { Button, Spinner, Modal, Pagination } from '@components';
import { useTasksData } from '@hooks';
import { TasksTableHeader } from './TasksTableHeader';
import { TaskTableRow } from './TaskTableRow';
import { CreateTaskModal } from './CreateTaskModal/CreateTaskModal';

const Tasks: React.FC = () => {
  const { tasksList, isLoading, error } = useTasksData();
  const [createTaskModal, setCreateTaskModal] = useState<boolean>(false);

  const openCreatetaskModal = () => setCreateTaskModal(true);
  const closeCreateTaskModal = () => setCreateTaskModal(false);

  return (
    <div className="tasks">
      {isLoading && <Spinner />}
      {error && <p className="error">Error: {error}</p>}
      <div className="tasks__header">
        <h2>Tasks</h2>
        <Button title="New Task" onClick={openCreatetaskModal} />
      </div>
      <table>
        <TasksTableHeader />
        <tbody>
          {tasksList.map((task) => (
            <TaskTableRow task={task} key={task.id} />
          ))}
        </tbody>
      </table>
      {!tasksList.length && <span className="tasks__empty">List is empty</span>}
      <Pagination />
      <Modal open={createTaskModal} onClose={closeCreateTaskModal}>
        <CreateTaskModal onClose={closeCreateTaskModal} />
      </Modal>
    </div>
  );
};

export default Tasks;
