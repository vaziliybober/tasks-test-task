import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';

import useTenantguid from './useTenantguid';

export default function useTaskExecutorMutation() {
  const queryClient = useQueryClient();
  const tenantguid = useTenantguid();

  return useMutation(
    async (values) => {
      const { data } = await axios.put(`/api/${tenantguid}/Tasks`, values);
      return data;
    },
    {
      onMutate: (values) => {
        queryClient.setQueryData(
          ['task', tenantguid, values.id],
          (oldTask) => ({ ...oldTask, executorId: values.executorId })
        );
        queryClient.setQueryData(['tasks', tenantguid], (oldTasks) =>
          oldTasks.map((oldTask) =>
            oldTask.id === values.id
              ? { ...oldTask, executorId: values.executorId }
              : oldTask
          )
        );
      },
      onSettled: (_data, _error, values) => {
        queryClient.invalidateQueries(['task', tenantguid, values.id]);
        queryClient.invalidateQueries(['tasks', tenantguid]);
      },
    }
  );
}
