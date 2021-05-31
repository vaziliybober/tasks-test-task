import React from 'react';
import './Main.css';

import Tasks from '../tasks/Tasks';

import usePrioritiesQuery from '../../hooks/usePrioritiesQuery';
import useStatusesQuery from '../../hooks/useStatusesQuery';

export default function Main({ currentSection }) {
  usePrioritiesQuery();
  useStatusesQuery();

  const sections = {
    knowledgeBase: (
      <>
        <h1>База знаний</h1>
        <h1>База знаний</h1>
        <h1>База знаний</h1>
        <h1>База знаний</h1>
        <h1>База знаний</h1>
        <h1>База знаний</h1>
        <h1>База знаний</h1>
        <h1>База знаний</h1>
        <h1>База знаний</h1>
        <h1>База знаний</h1>
        <h1>База знаний</h1>
        <h1>База знаний</h1>
      </>
    ),
    tasks: <Tasks />,
    employees: <h1>Сотрудники</h1>,
    clients: <h1>Клиенты</h1>,
    assets: <h1>Активы</h1>,
    settings: <h1>Настройки</h1>,
  };

  return <div className="Main">{sections[currentSection]}</div>;
}
