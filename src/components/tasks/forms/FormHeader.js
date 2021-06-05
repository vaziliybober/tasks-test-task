import React from 'react';
import styled from '@emotion/styled';

import closeImg from '../../../images/close.svg';

export default function FormHeader({ title, description, onClose, className }) {
  return (
    <Container className={className}>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <CloseImg src={closeImg} alt="close" onClick={onClose} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 60px;

  background: #1a4876;
  padding: 12px 34px;
  color: #fff;
`;

const Title = styled.div`
  margin-right: 25px;
  white-space: nowrap;
  font-weight: normal;
  font-size: 18px;
`;

const Description = styled.div`
  min-width: 150px;
  max-width: 560px;
  margin-right: 10px;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  line-height: 15px;
  font-size: 16px;
  font-weight: lighter;
  max-height: 30px;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const CloseImg = styled.img`
  width: 16px;
  height: 16px;
  margin-left: auto;

  cursor: pointer;
`;
