import React from 'react';

import { useQuery } from 'react-query';
import axios from 'axios';

export default function useTenantguidQuery() {
  const tenantguidQuery = useQuery(
    'tenantguid',
    async () => {
      const { data } = await axios.get('/api/Tenants');
      return data;
    },
    { enabled: false }
  );

  const { refetch } = tenantguidQuery;

  React.useEffect(() => {
    refetch();
  }, [refetch]);

  if (tenantguidQuery.isIdle) {
    return {
      ...tenantguidQuery,
      isLoading: true,
      isIdle: false,
      status: 'loading',
    };
  }

  return tenantguidQuery;
}
