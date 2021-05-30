import { useQuery } from 'react-query';
import axios from 'axios';
import useTenantguid from './useTenantguid';

const useTasks = () => {
  const tenantguidInfo = useTenantguid();

  const tasksInfo = useQuery(
    'tasks',
    async () => {
      const {
        data: { value },
      } = await axios.get('/odata/tasks', {
        params: { tenantguid: tenantguidInfo.data },
      });
      return value;
    },
    {
      enabled: !!tenantguidInfo.data,
    }
  );

  if (tenantguidInfo.isSuccess) {
    return tasksInfo;
  }

  if (tenantguidInfo.isError) {
    return {
      ...tasksInfo,
      isError: true,
      status: 'error',
      error: tenantguidInfo.error,
    };
  }

  return { ...tasksInfo, isLoading: true, status: 'loading' };
};

export default useTasks;
