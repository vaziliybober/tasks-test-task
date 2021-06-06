import React from 'react';
import styled from '@emotion/styled';

import Select from '../../shared/Select';

import useUsersQuery from '../../../hooks/useUsersQuery';
import useTaskExecutorMutation from '../../../hooks/useTaskExecutorMutation';

export default function StatusChanger({ task, className }) {
  const { data: executors, isSuccess } = useUsersQuery();

  const taskExecutorMutation = useTaskExecutorMutation();

  if (!isSuccess) {
    return <Executor>{task.executorName}</Executor>;
  }

  const mutableData = {
    id: task.id,
    statusId: task.statusId,
    executorId: task.executorId,
  };

  const options = executors.map((executor) => ({
    value: executor.id,
    label: <Executor>{executor.name}</Executor>,
  }));

  const handleChange = (option) => {
    taskExecutorMutation.mutate({ ...mutableData, executorId: option.value });
  };

  return (
    <Select
      value={task.executorId}
      options={options}
      onChange={handleChange}
      className={className}
    />
  );
}

const Executor = styled.div`
  color: #1974d2;
  font-size: 14px;
`;
