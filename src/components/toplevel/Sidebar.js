import React from 'react';
import './Sidebar.css';

import logoImg from '../../images/logo.png';
import bookImg from '../../images/book.svg';
import fileImg from '../../images/file.svg';
import peopleImg from '../../images/people.svg';
import cityImg from '../../images/city.svg';
import analyticsImg from '../../images/analytics.svg';
import settingsImg from '../../images/settings.svg';

const sections = [
  { name: 'knowledgeBase', img: bookImg, alt: 'book', text: 'База знаний' },
  { name: 'tasks', img: fileImg, alt: 'file', text: 'Заявки' },
  { name: 'employees', img: peopleImg, alt: 'people', text: 'Сотрудники' },
  { name: 'clients', img: cityImg, alt: 'city', text: 'Клиенты' },
  { name: 'assets', img: analyticsImg, alt: 'analytics', text: 'Активы' },
  { name: 'settings', img: settingsImg, alt: 'settings', text: 'Настройки' },
];

export default function Sidebar({
  currentSection,
  setCurrentSection = () => {},
}) {
  const makeClickHandler = (sectionName) => () => {
    setCurrentSection(sectionName);
  };

  return (
    <div className="Sidebar">
      <img className="Sidebar-logo" src={logoImg} alt="logo" />
      <nav>
        <ul>
          {sections.map((section) => {
            return (
              <li
                className={
                  section.name === currentSection ? 'Sidebar-active' : ''
                }
                onClick={makeClickHandler(section.name)}
                key={section.name}
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
