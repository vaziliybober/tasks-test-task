import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';

import useTenantguid from './useTenantguid';

export default function useCommentTaskMutation() {
  const queryClient = useQueryClient();
  const tenantguid = useTenantguid();

  return useMutation(
    async (values) => {
      const { data } = await axios.put(`/api/${tenantguid}/Tasks`, values);
      return data;
    },
    {
      onSuccess: (_data, values) => {
        queryClient.invalidateQueries(['task', tenantguid, values.id]);
      },
    }
  );
}
