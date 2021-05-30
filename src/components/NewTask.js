import React from 'react';
import '../css/NewTask.css';
import closeImg from '../images/close.svg';

export default function NewTask({ onClose }) {
  return (
    <div className="NewTask">
      <div className="NewTask-head">
        <h1>Новая заявка</h1>
        <img src={closeImg} alt="close" onClick={onClose} />
      </div>
      <div className="NewTask-field">
        <div className="NewTask-field-name">Название</div>
        <textarea className="NewTask-textarea-name"></textarea>
      </div>
      <div className="NewTask-field">
        <div className="NewTask-field-name">Описание</div>
        <textarea className="NewTask-textarea-description"></textarea>
      </div>
      <button className="btn" type="button">
        Сохранить
      </button>
    </div>
  );
}
