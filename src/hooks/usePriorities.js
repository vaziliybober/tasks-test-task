import { useQuery } from 'react-query';
import axios from 'axios';
import useTenantguid from './useTenantguid';

const usePriorities = () => {
  const { data: tenantguid } = useTenantguid();

  const info = useQuery(
    'priorities',
    async () => {
      const { data } = await axios.get(`/api/${tenantguid}/Priorities`);
      return data;
    },
    {
      enabled: !!tenantguid,
    }
  );

  return info;
};

export default usePriorities;
