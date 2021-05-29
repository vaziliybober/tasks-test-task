import { useQuery } from 'react-query';
import axios from 'axios';
import useTenantguid from './useTenantguid';

const useTasks = () => {
  const { data: tenantguid } = useTenantguid();

  const info = useQuery(
    'tasks',
    async () => {
      const {
        data: { value },
      } = await axios.get('/odata/tasks', {
        params: { tenantguid },
      });
      return value;
    },
    {
      enabled: !!tenantguid,
    }
  );

  return info;
};

export default useTasks;
