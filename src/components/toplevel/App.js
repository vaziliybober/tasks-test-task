import React from 'react';
import './App.css';

import Sidebar from './Sidebar';
import Main from './Main';

import useTenantguidQuery from '../../hooks/useTenantguidQuery';

import { TenantguidProvider } from '../../contexts/TenantguidContext';

function App() {
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
      <div className="App">
        <Sidebar
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
        />
        <Main currentSection={currentSection} />
      </div>
    </TenantguidProvider>
  );
}

export default App;
