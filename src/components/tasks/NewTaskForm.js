import React from 'react';
import './NewTaskForm.css';

import closeImg from '../../images/close.svg';

import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';

import useTenantguid from '../../hooks/useTenantguid';

export default function NewTaskForm({ onClose, onSuccess }) {
  const nameRef = React.useRef();
  const descriptionRef = React.useRef();

  const { data: tenantguid } = useTenantguid();

  const queryClient = useQueryClient();

  const mutation = useMutation(
    async (taskData) => {
      const { data } = await axios.post(`/api/${tenantguid}/Tasks`, taskData);
      return data;
    },
    {
      onSuccess: (taskId) => {
        nameRef.current.value = '';
        descriptionRef.current.value = '';
        queryClient.invalidateQueries('tasks');
        if (onSuccess) {
          onSuccess(taskId);
        }
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      name: nameRef.current.value,
      description: descriptionRef.current.value,
    };

    mutation.mutate(body);
  };

  return (
    <div className="TaskForm NewTaskForm">
      <div className="TaskForm-header">
        <h1>Новая заявка</h1>
        <img src={closeImg} alt="close" onClick={onClose} />
      </div>
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
        <button
          className="btn TaskForm-button"
          type="submit"
          disabled={mutation.isLoading}
        >
          Сохранить
        </button>
        {mutation.isError && (
          <div>Не удалось создать заявку. Пожалуйста, попробуйте снова.</div>
        )}
      </form>
    </div>
  );
}
