import React from 'react';
import './styles.css';

import Header from './Header';
import TasksTable from './TableOfTasks';
import NewTaskForm from './NewTaskForm';

import usePriorities from '../../hooks/usePriorities';
import useStatuses from '../../hooks/useStatuses';
import useTasks from '../../hooks/useTasks';

export default function Tasks({ mode, setMode }) {
  const { data: tasks, status } = useTasks();
  const { data: statuses } = useStatuses();
  const { data: priorities } = usePriorities();

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

  return (
    <div className="Tasks">
      <Header />
      <div className="Tasks-body">
        <div className="Tasks-body-left">
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
            className="Tasks-body-right"
            style={{ display: mode !== 'add' && 'none' }}
          >
            <NewTaskForm onClose={() => setMode('view')} />
          </div>
        }
      </div>
    </div>
  );
}
