import React from 'react';
import '../css/Tasks.css';
import useTasks from '../hooks/useTasks.js';

export default function Tasks() {
  const { isSuccess, data: tasks } = useTasks();

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
                  <div className="Tasks-priority" />
                </td>
                <td>{task.id}</td>
                <td>
                  <div class="Tasks-name">{task.name}</div>
                </td>
                <td>{task.statusName}</td>
                <td>{task.executorName}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
