import React from 'react';
import '../css/Tasks.css';
import usePriorities from '../hooks/usePriorities';
import useStatuses from '../hooks/useStatuses';
import useTasks from '../hooks/useTasks.js';
import _ from 'lodash';

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
            const priorityRgb = _.find(
              priorities,
              (p) => p.id === task.priorityId
            ).rgb;

            const statusRgb = _.find(
              statuses,
              (p) => p.id === task.statusId
            ).rgb;

            return (
              <tr key={task.id}>
                <td>
                  <div
                    className="Tasks-priority"
                    style={{
                      background: priorityRgb,
                    }}
                  />
                </td>
                <td>{task.id}</td>
                <td>
                  <div className="Tasks-name">{task.name}</div>
                </td>
                <td>
                  <div
                    className="Tasks-status"
                    style={{
                      background: statusRgb,
                    }}
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
