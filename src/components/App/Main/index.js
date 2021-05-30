import React from 'react';
import './styles.css';

import Tasks from '../../Tasks';

export default function Main({ currentSection }) {
  const sections = {
    knowledgeBase: <h1>База знаний</h1>,
    tasks: <Tasks />,
    employees: <h1>Сотрудники</h1>,
    clients: <h1>Клиенты</h1>,
    assets: <h1>Активы</h1>,
    settings: <h1>Настройки</h1>,
  };

  return <div className="Main">{sections[currentSection]}</div>;
}
