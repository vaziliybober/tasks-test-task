import React from 'react';
import './styles.css';

import Tasks from '../../Tasks';

export default function Main({ currentSection }) {
  const [tasksMode, setTasksMode] = React.useState('view');

  const sections = {
    knowledgeBase: <h1>База знаний</h1>,
    tasks: <Tasks mode={tasksMode} setMode={(mode) => setTasksMode(mode)} />,
    employees: <h1>Сотрудники</h1>,
    clients: <h1>Клиенты</h1>,
    assets: <h1>Активы</h1>,
    settings: <h1>Настройки</h1>,
  };

  return <div className="Main">{sections[currentSection]}</div>;
}
