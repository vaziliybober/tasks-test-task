import React, { useEffect } from 'react';
import '../css/Tasks.css';
import TasksTable from './TasksTable.js';
import usePriorities from '../hooks/usePriorities.js';
import useStatuses from '../hooks/useStatuses.js';
import useTasks from '../hooks/useTasks.js';

export default function Tasks() {
  const { isSuccess, data: tasks } = useTasks();

  const { data: statuses } = useStatuses();
  const { data: priorities } = usePriorities();

  if (!isSuccess) {
    return 'Loading...';
  }

  return (
    <div className="Tasks">
      <button className="btn" type="button">
        Создать заявку
      </button>
      <TasksTable tasks={tasks} priorities={priorities} statuses={statuses} />
    </div>
  );
}
