import React from 'react';
import Tasks from './Tasks.js';
import '../css/Main.css';

const sections = {
  knowledgeBase: <h1>База знаний</h1>,
  tasks: <Tasks />,
  employees: <h1>Сотрудники</h1>,
  clients: <h1>Клиенты</h1>,
  assets: <h1>Активы</h1>,
  settings: <h1>Настройки</h1>,
};

export default function Main({ currentSection }) {
  return <div className="Main">{sections[currentSection]}</div>;
}
