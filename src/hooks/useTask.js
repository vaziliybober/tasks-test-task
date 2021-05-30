import { useQuery } from 'react-query';
import axios from 'axios';
import useTenantguid from './useTenantguid';

const useTask = (taskId) => {
  const tenantguidInfo = useTenantguid();

  const taskInfo = useQuery(
    ['task', taskId],
    async () => {
      const { data } = await axios.get(
        `/api/${tenantguidInfo.data}/Tasks/${taskId}`
      );
      return data;
    },
    {
      enabled: !!taskId && !!tenantguidInfo.data,
    }
  );

  return taskInfo;
};

export default useTask;
