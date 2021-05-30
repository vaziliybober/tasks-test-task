import React from 'react';
import './styles.css';

import logoImg from './images/logo.png';
import bookImg from './images/book.svg';
import fileImg from './images/file.svg';
import peopleImg from './images/people.svg';
import cityImg from './images/city.svg';
import analyticsImg from './images/analytics.svg';
import settingsImg from './images/settings.svg';

const sections = {
  knowledgeBase: {
    img: bookImg,
    alt: 'book',
    text: 'База знаний',
  },
  tasks: {
    img: fileImg,
    alt: 'file',
    text: 'Заявки',
  },
  employees: {
    img: peopleImg,
    alt: 'people',
    text: 'Сотрудники',
  },
  clients: {
    img: cityImg,
    alt: 'city',
    text: 'Клиенты',
  },
  assets: {
    img: analyticsImg,
    alt: 'analytics',
    text: 'Активы',
  },
  settings: {
    img: settingsImg,
    alt: 'settings',
    text: 'Настройки',
  },
};

export default function Sidebar({ currentSection, setCurrentSection }) {
  const makeClickHandler = (sectionName) => (e) => {
    setCurrentSection(sectionName);
  };

  return (
    <div className="Sidebar">
      <img className="Sidebar-logo" src={logoImg} alt="logo" />
      <nav>
        <ul>
          {Object.entries(sections).map(([sectionName, section]) => {
            return (
              <li
                className={
                  sectionName === currentSection ? 'Sidebar-active' : ''
                }
                onClick={makeClickHandler(sectionName)}
                key={sectionName}
              >
                <img src={section.img} alt={section.alt} />
                <div>{section.text}</div>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
