import React from 'react';
import './Tasks.css';

import Header from './Header';
import Button from '../shared/Button';
import TableOfTasks from './TableOfTasks';
import NewTaskForm from './NewTaskForm';
import EditTaskForm from './EditTaskForm';

export default function Tasks() {
  const [mode, setMode] = React.useState('view');
  const [editTaskId, setEditTaskId] = React.useState();

  const openTaskEditor = (taskId) => {
    setMode('edit');
    setEditTaskId(taskId);
  };

  const openTaskCreator = () => {
    setMode('create');
  };

  const expandTasksViewer = () => {
    setMode('view');
  };

  return (
    <div className="Tasks">
      <Header />
      <div className="Tasks-body">
        <div className="Tasks-body-left">
          <Button
            onClick={openTaskCreator}
            css={{
              margin: '25px 0 0 260px',
              '@media (max-width: 800px)': { marginLeft: '130px' },
            }}
          >
            Создать заявку
          </Button>
          <TableOfTasks shorten={mode !== 'view'} onClick={openTaskEditor} />
        </div>
        <div
          className="Tasks-body-right"
          style={{ display: mode !== 'create' && 'none' }}
        >
          <NewTaskForm onClose={expandTasksViewer} onSuccess={openTaskEditor} />
        </div>
        <div
          className="Tasks-body-right"
          style={{ display: mode !== 'edit' && 'none' }}
        >
          {editTaskId && (
            <EditTaskForm taskId={editTaskId} onClose={expandTasksViewer} />
          )}
        </div>
      </div>
    </div>
  );
}
