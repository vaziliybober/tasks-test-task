import { useQuery } from 'react-query';
import axios from 'axios';

import useTenantguid from './useTenantguid';

export default function useStatusesQuery() {
  const tenantguid = useTenantguid();

  return useQuery(['statuses', tenantguid], async () => {
    const { data } = await axios.get(`/api/${tenantguid}/Statuses`);
    return data;
  });
}
