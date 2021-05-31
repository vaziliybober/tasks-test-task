import { useQuery } from 'react-query';
import axios from 'axios';

import useTenantguid from './useTenantguid';

export default function usePrioritiesQuery() {
  const tenantguid = useTenantguid();

  return useQuery(['priorities', tenantguid], async () => {
    const { data } = await axios.get(`/api/${tenantguid}/Priorities`);
    return data;
  });
}
