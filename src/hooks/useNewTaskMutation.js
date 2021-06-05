import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';

import useTenantguid from './useTenantguid';

export default function useNewTaskMutation() {
  const tenantguid = useTenantguid();
  const queryClient = useQueryClient();

  return useMutation(
    async (taskData) => {
      const { data } = await axios.post(`/api/${tenantguid}/Tasks`, taskData);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['tasks', tenantguid]);
      },
    }
  );
}
