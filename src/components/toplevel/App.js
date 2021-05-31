import React from 'react';
import './App.css';

import Sidebar from './Sidebar';
import Main from './Main';

import useTenantguidQuery from '../../hooks/useTenantguidQuery';

import { TenantguidProvider } from '../../contexts/TenantguidContext';

function App() {
  const [currentSection, setCurrentSection] = React.useState('knowledgeBase');

  const tenantguidQuery = useTenantguidQuery();

  React.useEffect(() => {
    if (tenantguidQuery.isSuccess) {
    }
  }, [tenantguidQuery.isSuccess]);

  if (tenantguidQuery.isLoading) {
    return 'Loading...';
  }

  if (tenantguidQuery.isError) {
    return 'Error!';
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
