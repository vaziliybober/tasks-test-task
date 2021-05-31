import { useQuery } from 'react-query';
import axios from 'axios';

import useTenantguid from './useTenantguid';

export default function useUsersQuery() {
  const tenantguid = useTenantguid();

  return useQuery(['users', tenantguid], async () => {
    const { data } = await axios.get(`/api/${tenantguid}/Users`);
    return data;
  });
}
