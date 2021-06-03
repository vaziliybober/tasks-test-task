import React from 'react';
import styled from '@emotion/styled';

import searchImg from '../../images/search.svg';

export default function TasksHeader({ className }) {
  return (
    <Container className={className}>
      <SearchContainer>
        <Input
          type="search"
          placeholder="Введите Фамилию, Статус, Приоритет, Тег и т.д. чтобы найти заявки"
        />
        <SearchImg src={searchImg} alt="search" />
      </SearchContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;

  background: #d1e0ed;
  padding: 0 17px;
  box-shadow: 0 0 7px 0 rgba(0, 0, 0, 0.2);
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  flex-basis: 680px;

  background: #fff;
  padding: 7.5px 19px 7.5px 9px;
  border: 1px solid #a9b2c9;
  border-radius: 2em;

  &:focus-within {
    border-color: #42aaff;
    box-shadow: 0 0 7px 0 rgba(0, 140, 240, 0.15),
      inset -1px 0px 7px 0 rgba(0, 0, 0, 0.11);
  }
`;

const Input = styled.input`
  display: block;
  flex-grow: 1;
  min-width: 0;

  font-size: 16px;
  font-weight: normal;
  color: #a9b2c9;
  padding: 0 10px;
  border-width: 0;

  &:focus {
    outline: none;
  }
`;

const SearchImg = styled.img`
  width: 19px;
  height: 19px;
`;
