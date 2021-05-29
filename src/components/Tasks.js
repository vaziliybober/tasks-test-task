import React from 'react';
import '../css/Tasks.css';
import TasksTable from './TasksTable.js';
import NewTask from './NewTask.js';
import usePriorities from '../hooks/usePriorities.js';
import useStatuses from '../hooks/useStatuses.js';
import useTasks from '../hooks/useTasks.js';

export default function Tasks() {
  const { isSuccess, data: tasks } = useTasks();
  const { data: statuses } = useStatuses();
  const { data: priorities } = usePriorities();

  const [mode, setMode] = React.useState('view');

  if (!isSuccess) {
    return 'Loading...';
  }

  return (
    <div className="Tasks">
      <div>
        <button className="btn" type="button" onClick={() => setMode('add')}>
          Создать заявку
        </button>
        <TasksTable
          shorten={mode !== 'view'}
          tasks={tasks}
          priorities={priorities}
          statuses={statuses}
        />
      </div>
      {mode === 'add' && <NewTask onClose={() => setMode('view')} />}
    </div>
  );
}
