import React, { useEffect } from 'react';
import Header from './Header.js';
import Sidebar from './Sidebar.js';
import Main from './Main.js';
import '../css/App.css';
import useTenantguid from '../hooks/useTenantguid.js';
import useTasks from '../hooks/useTasks.js';

function App() {
  const [currentSection, setCurrentSection] = React.useState('tasks');
  const { refetch: refetchTenantguid, isLoading: isLoadingTenantguid } =
    useTenantguid();

  useEffect(() => {
    refetchTenantguid();
  }, []);

  const { isLoading, data: tasks } = useTasks();

  return (
    <div className="App">
      <Sidebar
        currentSection={currentSection}
        setCurrentSection={setCurrentSection}
      />
      <div className="App-right">
        <Header />
        <Main />
        <div>{currentSection}</div>
        <div>
          {isLoadingTenantguid
            ? 'Loading Tenantguid'
            : isLoading
            ? 'Loading tasks'
            : JSON.stringify(tasks, null, 2)}
        </div>
      </div>
    </div>
  );
}

export default App;
