import React from 'react';
import './styles.css';

import Sidebar from './Sidebar';
import Main from './Main';

import useTenantguid from '../../hooks/useTenantguid';
import usePriorities from '../../hooks/usePriorities';
import useStatuses from '../../hooks/useStatuses';

function App() {
  const [currentSection, setCurrentSection] = React.useState('tasks');
  const { refetch: refetchTenantguid } = useTenantguid();
  usePriorities();
  useStatuses();

  React.useEffect(() => {
    refetchTenantguid();
  }, []);

  return (
    <div className="App">
      <Sidebar
        currentSection={currentSection}
        setCurrentSection={setCurrentSection}
      />
      <div className="App-right">
        <Main currentSection={currentSection} />
      </div>
    </div>
  );
}

export default App;
