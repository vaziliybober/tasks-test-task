import React from 'react';

const TenantguidContext = React.createContext();

function TenantguidProvider({ children, value }) {
  return (
    <TenantguidContext.Provider value={value}>
      {children}
    </TenantguidContext.Provider>
  );
}

function useTenantguid() {
  const context = React.useContext(TenantguidContext);

  if (context === undefined) {
    throw new Error('useTenantguid must be used within a TenantguidProvider');
  }

  return context;
}

export { TenantguidProvider, useTenantguid };
