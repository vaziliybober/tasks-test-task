import React from 'react';
import './styles.css';

import Header from './Header';
import TasksTable from './TableOfTasks';
import NewTaskForm from './NewTaskForm';

import usePriorities from '../../hooks/usePriorities';
import useStatuses from '../../hooks/useStatuses';
import useTasks from '../../hooks/useTasks';

export default function Tasks({ mode, setMode }) {
  const { isSuccess, data: tasks } = useTasks();
  const { data: statuses } = useStatuses();
  const { data: priorities } = usePriorities();

  if (!isSuccess) {
    return 'Loading...';
  }

  return (
    <div className="Tasks">
      <Header />
      <div className="Tasks-wrapper">
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
        {
          <div
            className="Tasks-right-wrapper"
            style={{ display: mode !== 'add' && 'none' }}
          >
            <NewTaskForm onClose={() => setMode('view')} />
          </div>
        }
      </div>
    </div>
  );
}
