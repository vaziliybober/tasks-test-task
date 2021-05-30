import React from 'react';
import './styles.css';

import _ from 'lodash';

const formatId = (id) => {
  let result = '';
  const strId = id.toString();
  for (let i = strId.length - 1; i >= 0; i--) {
    result = strId[i] + result;
    if (i % 3 === 0 && i > 0) {
      result = ' ' + result;
    }
  }
  return result;
};

export default function TasksTable({
  tasks,
  priorities,
  statuses,
  shorten = false,
}) {
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
            {!shorten && (
              <>
                <th>
                  <div>Статус</div>
                </th>
                <th>
                  <div>Исполнитель</div>
                </th>
              </>
            )}
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
                    className="TasksTable-priority"
                    style={{
                      background: priorityRgb,
                    }}
                  />
                </td>
                <td className="TasksTable-id">{formatId(task.id)}</td>
                <td>
                  <div className="TasksTable-name">{task.name}</div>
                </td>
                {!shorten && (
                  <>
                    <td>
                      <div
                        className="TasksTable-status"
                        style={{
                          background: statusRgb,
                          color: statusRgb && '#fff',
                        }}
                      >
                        {task.statusName}
                      </div>
                    </td>
                    <td>{task.executorName}</td>
                  </>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
