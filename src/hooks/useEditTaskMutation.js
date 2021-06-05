import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';

import useTenantguid from './useTenantguid';

export default function useEditTaskMutation(taskId) {
  const queryClient = useQueryClient();
  const tenantguid = useTenantguid();

  return useMutation(
    async (task) => {
      const { data } = await axios.put(`/api/${tenantguid}/Tasks`, task);
      return data;
    },
    {
      onMutate: (task) => {
        const previousTask = queryClient.getQueryData([
          'task',
          tenantguid,
          taskId,
        ]);
        queryClient.setQueryData(['task', tenantguid, taskId], {
          ...previousTask,
          ...task,
        });

        const previousTasks = queryClient.getQueryData(['tasks', tenantguid]);
        queryClient.setQueryData(
          ['tasks', tenantguid],
          previousTasks.map((prevTask) =>
            prevTask.id === taskId ? { ...prevTask, ...task } : prevTask
          )
        );

        return { previousTask, previousTasks };
      },
      onError: (_err, _newTodo, context) => {
        queryClient.setQueryData(
          ['task', tenantguid, taskId],
          context.previousTask
        );
        queryClient.setQueryData(['tasks', tenantguid], context.previousTasks);
      },
      onSettled: () => {
        queryClient.invalidateQueries(['tasks', tenantguid]);
        queryClient.invalidateQueries(['task', tenantguid, taskId]);
      },
    }
  );
}
