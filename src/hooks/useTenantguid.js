import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

const useTenantguid = () => {
  const info = useQuery(
    'tenantguid',
    async () => {
      const { data } = await axios.get('/api/Tenants');
      return data;
    },
    { enabled: false }
  );

  return info;
};

export default useTenantguid;
