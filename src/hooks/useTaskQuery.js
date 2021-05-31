import { useQuery } from 'react-query';
import axios from 'axios';

import useTenantguid from './useTenantguid';

export default function useTaskQuery(taskId) {
  const tenantguid = useTenantguid();

  const taskQuery = useQuery(['task', tenantguid, taskId], async () => {
    const { data } = await axios.get(`/api/${tenantguid}/Tasks/${taskId}`);
    return data;
  });

  return taskQuery;
}
