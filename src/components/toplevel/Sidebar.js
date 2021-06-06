import React from 'react';
import styled from '@emotion/styled';

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
  className,
}) {
  return (
    <Container className={className} css={{ padding: '16px 0' }}>
      <LogoImage src={logoImg} alt="logo" />
      <nav>
        <Ul>
          {sections.map((section) => (
            <NavItem
              key={section.name}
              section={section}
              active={section.name === currentSection}
              onClick={() => setCurrentSection(section.name)}
            />
          ))}
        </Ul>
      </nav>
    </Container>
  );
}

function NavItem({ section, active, onClick }) {
  return (
    <Li active={active} onClick={onClick}>
      <SectionImage src={section.img} alt={section.alt} />
      <div>{section.text}</div>
    </Li>
  );
}

const Container = styled.div`
  background: #002137;
`;

const LogoImage = styled.img`
  display: block;
  width: 52;
  height: 44;
  margin: 0 auto 23px auto;
`;

const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;

  list-style: none;
  font-size: 12px;
  color: #fff;
`;

const Li = styled.li(({ active }) => ({
  padding: '10px 0',
  width: '100%',
  textAlign: 'center',
  background: active ? '#002c49' : 'inherit',

  '&:hover': {
    background: '#002c49',
    cursor: 'pointer',
  },
}));

const SectionImage = styled.img``;
