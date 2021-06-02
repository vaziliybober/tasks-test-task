import React from 'react';
import './EditTaskForm.css';

import closeImg from '../../images/close.svg';
import calendarImg from '../../images/calendar.svg';

import axios from 'axios';
import _ from 'lodash';
import DOMPurify from 'dompurify';
import { useMutation, useQueryClient } from 'react-query';

import { formatId } from '../../shared';

import Button from '../shared/Button';
import Select from '../shared/Select';
import Comments from './Comments';

import useTenantguid from '../../hooks/useTenantguid';
import useTaskQuery from '../../hooks/useTaskQuery';
import useStatusesQuery from '../../hooks/useStatusesQuery';
import useUsersQuery from '../../hooks/useUsersQuery';

const useEditTaskMutation = (taskId) => {
  const queryClient = useQueryClient();
  const tenantguid = useTenantguid();

  return useMutation(
    async (taskData) => {
      const { data } = await axios.put(`/api/${tenantguid}/Tasks`, taskData);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['tasks', tenantguid]);
        queryClient.invalidateQueries(['task', tenantguid, taskId]);
      },
    }
  );
};

function Form({ taskId }) {
  const { data: task } = useTaskQuery(taskId);
  const { data: statuses } = useStatusesQuery();
  const { data: users } = useUsersQuery();

  const editTaskMutation = useEditTaskMutation(taskId);

  const statusSelectRef = React.useRef();
  const executorSelectRef = React.useRef();
  const commentTextareaRef = React.useRef();

  React.useEffect(() => {
    if (task) {
      statusSelectRef.current.value = task.statusId;
      executorSelectRef.current.value = task.executorId;
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskData = {
      id: taskId,
      comment: commentTextareaRef.current.value,
      statusId: statusSelectRef.current.value,
      executorId: executorSelectRef.current.value,
    };

    editTaskMutation.mutate(taskData, {
      onSuccess: () => {
        commentTextareaRef.current.value = '';
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="EditTaskForm-selects">
        <div>
          <div className="TaskForm-fieldname">Статус</div>
          <Select
            ref={statusSelectRef}
            defaultValue={task.statusId}
            key={task.statusId}
            css={{ marginBottom: 25, marginRight: 50 }}
          >
            {statuses &&
              statuses.map((status, i) => {
                return (
                  <option value={status.id} key={status.id}>
                    {status.name}
                  </option>
                );
              })}
          </Select>
        </div>
        <div>
          <div className="TaskForm-fieldname">Исполнитель</div>
          <Select
            ref={executorSelectRef}
            defaultValue={task.executorId}
            key={task.executorId}
            css={{ marginBottom: 25, marginRight: 50 }}
          >
            {users &&
              users.map((user, i) => {
                return (
                  <option value={user.id} key={user.id}>
                    {user.name}
                  </option>
                );
              })}
          </Select>
        </div>
      </div>
      <div className="TaskForm-fieldname">Добавление коментариев</div>
      <textarea ref={commentTextareaRef} />
      <Button
        type="submit"
        disabled={!statuses || !users || editTaskMutation.isLoading}
        css={{ marginBottom: 44, fontSize: 14 }}
      >
        Сохранить
      </Button>
      {editTaskMutation.isError && (
        <div className="EditTaskForm-error">
          Не удалось создать заявку. Пожалуйста, попробуйте снова.
        </div>
      )}
    </form>
  );
}

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString('ru', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
  });
};

export default function EditTaskForm({ taskId, onClose = () => {} }) {
  if (!taskId) {
    throw new Error('taskId is a required prop in EditTaskForm');
  }

  const { data: task, status } = useTaskQuery(taskId);
  const { data: statuses } = useStatusesQuery();

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
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(task.description),
            }}
          ></div>
          <Form taskId={taskId} />
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
