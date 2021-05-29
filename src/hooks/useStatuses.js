import { useQuery } from 'react-query';
import axios from 'axios';
import useTenantguid from './useTenantguid';

const useStatuses = () => {
  const { data: tenantguid } = useTenantguid();

  const info = useQuery(
    'statuses',
    async () => {
      const { data } = await axios.get(`/api/${tenantguid}/Statuses`);
      return data;
    },
    {
      enabled: !!tenantguid,
    }
  );

  return info;
};

export default useStatuses;
