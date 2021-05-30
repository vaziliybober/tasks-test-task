import React from 'react';
import './styles.css';

import closeImg from './images/close.svg';

import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';

import useTenantguid from '../../../hooks/useTenantguid';

export default function NewTask({ onClose }) {
  const nameRef = React.useRef();
  const descriptionRef = React.useRef();

  const { data: tenantguid } = useTenantguid();

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (data) => axios.post(`/api/${tenantguid}/Tasks`, data),
    {
      onSuccess: () => {
        nameRef.current.value = '';
        descriptionRef.current.value = '';
        queryClient.invalidateQueries('tasks');
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      name: nameRef.current.value,
      descriptionRef: descriptionRef.current.value,
    };

    mutation.mutate(body);
  };

  return (
    <div className="NewTask">
      <div className="NewTask-head">
        <h1>Новая заявка</h1>
        <img src={closeImg} alt="close" onClick={onClose} />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="NewTask-field">
          <div className="NewTask-field-name">Название</div>
          <textarea className="NewTask-textarea-name" ref={nameRef}></textarea>
        </div>
        <div className="NewTask-field">
          <div className="NewTask-field-name">Описание</div>
          <textarea
            className="NewTask-textarea-description"
            ref={descriptionRef}
          ></textarea>
        </div>
        <button className="btn" type="submit" disabled>
          Сохранить
        </button>
      </form>
    </div>
  );
}
