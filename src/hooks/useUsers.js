import { useQuery } from 'react-query';
import axios from 'axios';
import useTenantguid from './useTenantguid';

const useUsers = () => {
  const { data: tenantguid } = useTenantguid();

  const info = useQuery(
    'ursers',
    async () => {
      const { data } = await axios.get(`/api/${tenantguid}/Users`);
      return data;
    },
    {
      enabled: !!tenantguid,
    }
  );

  return info;
};

export default useUsers;
