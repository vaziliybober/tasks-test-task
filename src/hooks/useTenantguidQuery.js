import axios from 'axios';

import useFetch from './useFetch';

export default function useTenantguidQuery() {
  return useFetch(async () => {
    const { data } = await axios.get('/api/Tenants');
    return data;
  });
}
