import React from 'react';
import styled from '@emotion/styled';

export default function FormField({ children, title, required, className }) {
  return (
    <div className={className}>
      <Title>
        {title}
        {required && <span style={{ color: 'red' }}> *</span>}
      </Title>
      {children}
    </div>
  );
}

const Title = styled.div`
  margin-bottom: 15px;

  font-family: 'Ubuntu';
  font-size: 14px;
  color: #9f9ea7;
`;
