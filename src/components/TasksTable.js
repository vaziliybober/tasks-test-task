import React from 'react';
import '../css/TasksTable.css';
import _ from 'lodash';

export default function TasksTable({ tasks, priorities, statuses }) {
  return (
    <div className="TasksTable">
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
            )?.rgb;

            const statusRgb = _.find(
              statuses,
              (p) => p.id === task.statusId
            )?.rgb;

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
                      color: statusRgb && '#fff',
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
