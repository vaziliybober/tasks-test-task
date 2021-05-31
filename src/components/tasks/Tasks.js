import React from 'react';
import './Tasks.css';

import Header from './Header';
import TableOfTasks from './TableOfTasks';
import NewTaskForm from './NewTaskForm';
import EditTaskForm from './EditTaskForm';

import usePrioritiesQuery from '../../hooks/usePrioritiesQuery';
import useStatusesQuery from '../../hooks/useStatusesQuery';
import useTasksQuery from '../../hooks/useTasksQuery';

export default function Tasks() {
  const { data: tasks, status } = useTasksQuery();
  const { data: statuses } = useStatusesQuery();
  const { data: priorities } = usePrioritiesQuery();

  const [mode, setMode] = React.useState('view');
  const [editTaskId, setEditTaskId] = React.useState();

  if (status === 'loading') {
    return <div className="Tasks-message">Загружаем данные...</div>;
  }

  if (status === 'error') {
    return (
      <div className="Tasks-message">
        Не удалось загрузить данные. Попробуйте обновить страницу.
      </div>
    );
  }

  const newTaskFormJSX = (
    <div
      className="Tasks-body-right"
      style={{ display: mode !== 'add' && 'none' }}
    >
      <NewTaskForm
        onClose={() => setMode('view')}
        onSuccess={(taskId) => {
          setMode('edit');
          setEditTaskId(taskId);
        }}
      />
    </div>
  );

  const editTaskFormJSX = (
    <div
      className="Tasks-body-right"
      style={{ display: mode !== 'edit' && 'none' }}
    >
      {editTaskId && (
        <EditTaskForm taskId={editTaskId} onClose={() => setMode('view')} />
      )}
    </div>
  );

  return (
    <div className="Tasks">
      <div className="Tasks-header">
        <Header />
      </div>

      <div className="Tasks-body">
        <div className="Tasks-body-left">
          <button
            className="btn Tasks-button"
            type="button"
            onClick={() => setMode('add')}
          >
            Создать заявку
          </button>
          <TableOfTasks
            tasks={tasks}
            priorities={priorities}
            statuses={statuses}
            shorten={mode !== 'view'}
            onClick={(taskId) => {
              setMode('edit');
              setEditTaskId(taskId);
            }}
          />
        </div>
        {newTaskFormJSX}
        {editTaskFormJSX}
      </div>
    </div>
  );
}
