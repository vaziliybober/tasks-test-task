import React from 'react';
import '../css/Tasks.css';
import usePriorities from '../hooks/usePriorities';
import useStatuses from '../hooks/useStatuses';
import useTasks from '../hooks/useTasks.js';

const statusClasses = {
  Открыта: 'Tasks-status-open',
  Выполнена: 'Tasks-status-done',
  'В работе': 'Tasks-status-in-work',
  Отложена: 'Tasks-status-postponed',
  'Требует уточнения': 'Tasks-status-unclear',
};

export default function Tasks() {
  const { isSuccess, data: tasks } = useTasks();

  const { data: statuses } = useStatuses();
  console.log(statuses);
  const { data: priorities } = usePriorities();
  console.log(priorities);

  const getPriorityRgb = (id) => {
    if (!priorities) {
      return;
    }

    for (const p of priorities) {
      if (p.id === id) {
        console.log(p.rgb);
        return p.rgb;
      }
    }
  };

  if (!isSuccess) {
    return 'Loading...';
  }

  return (
    <div className="Tasks">
      <button className="btn" type="button">
        Создать заявку
      </button>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>
              <div>ID</div>
            </th>
            <th>
              <div>Название</div>
            </th>
            <th>
              <div>Статус</div>
            </th>
            <th>
              <div>Исполнитель</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => {
            return (
              <tr key={task.id}>
                <td>
                  <div
                    className="Tasks-priority"
                    style={{ background: getPriorityRgb(task.priorityId) }}
                  />
                </td>
                <td>{task.id}</td>
                <td>
                  <div class="Tasks-name">{task.name}</div>
                </td>
                <td>
                  <div
                    className="Tasks-status"
                    style={{ background: task.statusRgb }}
                  >
                    {task.statusName}
                  </div>
                </td>
                <td>{task.executorName}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
