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
    return 'Инициализируем приложение...';
  }

  if (tenantguidQuery.isError) {
    return 'Не удалось инициализировать приложение. Попробуйте обновить страницу.';
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
