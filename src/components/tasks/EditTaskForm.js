import React from 'react';
import './EditTaskForm.css';

import closeImg from '../../images/close.svg';
import calendarImg from '../../images/calendar.svg';

import axios from 'axios';
import _ from 'lodash';
import { useMutation, useQueryClient } from 'react-query';

import { formatId } from '../../shared';

import Comments from './Comments';

import useTenantguid from '../../hooks/useTenantguid';
import useTaskQuery from '../../hooks/useTaskQuery';
import useStatusesQuery from '../../hooks/useStatusesQuery';
import useUsersQuery from '../../hooks/useUsersQuery';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString('ru', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
  });
};

export default function EditTaskForm({
  taskId,
  onClose = () => {},
  onSuccess = () => {},
}) {
  if (!taskId) {
    throw new Error('taskId is a required prop in EditTaskForm');
  }

  const tenantguid = useTenantguid();
  const { data: task, status } = useTaskQuery(taskId);
  const { data: statuses } = useStatusesQuery();
  const { data: users } = useUsersQuery();

  const statusSelectRef = React.useRef();
  const executorSelectRef = React.useRef();
  const commentTextareaRef = React.useRef();

  const queryClient = useQueryClient();

  const mutation = useMutation(
    async (taskData) => {
      const { data } = await axios.put(`/api/${tenantguid}/Tasks`, taskData);
      return data;
    },
    {
      onSuccess: () => {
        commentTextareaRef.current.value = '';
        queryClient.invalidateQueries(['tasks', tenantguid]);
        queryClient.invalidateQueries(['task', tenantguid, taskId]);
        if (onSuccess) {
          onSuccess();
        }
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskData = {
      id: taskId,
      comment: commentTextareaRef.current.value,
      statusId: statusSelectRef.current.value,
      executorId: executorSelectRef.current.value,
    };
    console.log(taskData);

    mutation.mutate(taskData);
  };

  React.useEffect(() => {
    if (task) {
      statusSelectRef.current.value = task.statusId;
      executorSelectRef.current.value = task.executorId;
    }
  }, [taskId]);

  if (status === 'loading') {
    return 'Loading task...';
  }

  if (status === 'error' || status === 'idle') {
    return "Couldn't load the task";
  }

  const comments = task.lifetimeItems.filter((item) => item.comment);
  const statusRgb = _.find(statuses, (s) => s.id === task.statusId)?.rgb;

  return (
    <div className="TaskForm EditTaskForm">
      <div className="TaskForm-header">
        <div className="EditTaskForm-header-text">
          <h1>{`№${formatId(taskId)}`}</h1>
          <div className="EditTaskForm-taskname">{task.name}</div>
        </div>
        <img src={closeImg} alt="close" onClick={onClose} />
      </div>
      <div className="TaskForm-body">
        <div className="EditTaskForm-left">
          <div className="TaskForm-fieldname">Описание</div>
          <div
            className="EditTaskForm-description"
            dangerouslySetInnerHTML={{ __html: task.description }}
          ></div>
          <form onSubmit={handleSubmit}>
            <div className="EditTaskForm-selects">
              <div>
                <div className="TaskForm-fieldname">Статус</div>
                <select
                  ref={statusSelectRef}
                  defaultValue={task.statusId}
                  key={task.statusId}
                >
                  {statuses &&
                    statuses.map((status, i) => {
                      return (
                        <option value={status.id} key={status.id}>
                          {status.name}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div>
                <div className="TaskForm-fieldname">Исполнитель</div>
                <select
                  ref={executorSelectRef}
                  defaultValue={task.executorId}
                  key={task.executorId}
                >
                  {users &&
                    users.map((user, i) => {
                      return (
                        <option value={user.id} key={user.id}>
                          {user.name}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>

            <div className="TaskForm-fieldname">Добавление коментариев</div>
            <textarea ref={commentTextareaRef} />
            <button
              className="button TaskForm-button"
              type="submit"
              disabled={!statuses || !users || mutation.isLoading}
            >
              Сохранить
            </button>
          </form>
          <Comments comments={comments} />
        </div>
        <div className="EditTaskForm-right">
          <div className="EditTaskForm-status">
            <div
              className="EditTaskForm-status-icon"
              style={{
                background: statusRgb,
              }}
            />
            <div className="EditTaskForm-status-text">{task.statusName}</div>
          </div>
          <div className="TaskForm-fieldname">Заявитель</div>
          <div className="EditTaskForm-fieldvalue EditTaskForm-initiator">
            {task.initiatorName}
          </div>
          <div className="TaskForm-fieldname">Создана</div>
          <div className="EditTaskForm-fieldvalue">{task.initiatorName}</div>
          <div className="TaskForm-fieldname">Исполнитель</div>
          <div className="EditTaskForm-fieldvalue EditTaskForm-executor">
            {task.executorName}
          </div>
          <div className="TaskForm-fieldname">Приоритет</div>
          <div className="EditTaskForm-fieldvalue">{task.priorityName}</div>
          <div className="TaskForm-fieldname">Срок</div>
          <div className="EditTaskForm-fieldvalue EditTaskForm-due-date">
            <img src={calendarImg} alt="date" />
            <div>{`${formatDate(task.resolutionDatePlan)} г.`}</div>
          </div>
          <div className="TaskForm-fieldname">Теги</div>
          <div className="EditTaskForm-tags">
            {task.tags.map((tag) => {
              return (
                <div className="EditTaskForm-tag" key={tag.id}>
                  {tag.name}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
