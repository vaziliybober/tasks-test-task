import React from 'react';
import './styles.css';

import searchImg from './images/search.svg';

export default function Header() {
  return (
    <div className="Header">
      <div className="Header-input">
        <input
          type="search"
          placeholder="Введите Фамилию, Статус, Приоритет, Тег и т.д. чтобы найти заявки"
        />
        <img src={searchImg} alt="search" />
      </div>
    </div>
  );
}
