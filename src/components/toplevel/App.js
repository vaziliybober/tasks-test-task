import React from 'react';
import styled from '@emotion/styled';

import UnstyledSidebar from './Sidebar';
import UnstyledMain from './Main';

import useTenantguidQuery from '../../hooks/useTenantguidQuery';

import { TenantguidProvider } from '../../contexts/TenantguidContext';

export default function App() {
  const [currentSection, setCurrentSection] = React.useState('tasks');

  const tenantguidQuery = useTenantguidQuery();

  if (tenantguidQuery.isLoading) {
    return <Loading>Инициализируем приложение...</Loading>;
  }

  if (tenantguidQuery.isError) {
    return (
      <Error>
        Не удалось инициализировать приложение. Попробуйте обновить страницу.
      </Error>
    );
  }

  return (
    <TenantguidProvider value={tenantguidQuery.data}>
      <>
        <Sidebar
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
        />
        <Main currentSection={currentSection} />
      </>
    </TenantguidProvider>
  );
}

const Sidebar = styled(UnstyledSidebar)`
  position: fixed;
  height: 100%;
  width: 95px;
`;

const Main = styled(UnstyledMain)`
  margin-left: 95px;
`;

const Loading = styled.div`
  margin-left: 20px;
  margin-top: 10px;
`;

const Error = styled.div`
  color: red;
  margin-left: 20px;
  margin-top: 10px;
`;
