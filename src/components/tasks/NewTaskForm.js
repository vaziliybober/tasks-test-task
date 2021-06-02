import React from 'react';
import './NewTaskForm.css';

import closeImg from '../../images/close.svg';

import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';

import Button from '../shared/Button';

import useTenantguid from '../../hooks/useTenantguid';

const useCreateTaskMutation = () => {
  const tenantguid = useTenantguid();
  const queryClient = useQueryClient();

  return useMutation(
    async (taskData) => {
      const { data } = await axios.post(`/api/${tenantguid}/Tasks`, taskData);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['tasks', tenantguid]);
      },
    }
  );
};

export default function NewTaskForm({
  onClose = () => {},
  onSuccess = () => {},
}) {
  const nameRef = React.useRef();
  const descriptionRef = React.useRef();

  const createTaskMutation = useCreateTaskMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskData = {
      name: nameRef.current.value,
      description: descriptionRef.current.value,
    };

    createTaskMutation.mutate(taskData, {
      onSuccess: (taskId) => {
        nameRef.current.value = '';
        descriptionRef.current.value = '';
        onSuccess(taskId);
      },
    });
  };

  return (
    <div className="TaskForm NewTaskForm">
      <div className="TaskForm-header">
        <h1>Новая заявка</h1>
        <img src={closeImg} alt="close" onClick={onClose} />
      </div>
      <div className="TaskForm-body">
        <form onSubmit={handleSubmit}>
          <div className="NewTaskForm-field">
            <div className="TaskForm-fieldname">Название</div>
            <textarea
              className="NewTaskForm-textarea-name"
              ref={nameRef}
            ></textarea>
          </div>
          <div className="NewTaskForm-field">
            <div className="TaskForm-fieldname">Описание</div>
            <textarea
              className="NewTaskForm-textarea-description"
              ref={descriptionRef}
            ></textarea>
          </div>
          <Button
            disabled={createTaskMutation.isLoading}
            css={{ marginTop: 52, marginBottom: 30, fontSize: 14 }}
          >
            Сохранить
          </Button>
          {createTaskMutation.isError && (
            <div className="NewTaskForm-error">
              Не удалось создать заявку. Пожалуйста, попробуйте снова.
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
