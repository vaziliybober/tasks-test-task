import { useQuery } from 'react-query';
import axios from 'axios';

import useTenantguid from './useTenantguid';

export default function useTasksQuery() {
  const tenantguid = useTenantguid();

  return useQuery(['tasks', tenantguid], async () => {
    const {
      data: { value },
    } = await axios.get('/odata/tasks', {
      params: { tenantguid },
    });
    return value;
  });
}
