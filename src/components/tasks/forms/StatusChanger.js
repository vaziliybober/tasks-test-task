import React from 'react';
import styled from '@emotion/styled';

import Select from '../../shared/Select';

import useStatusesQuery from '../../../hooks/useStatusesQuery';
import useTaskStatusMutation from '../../../hooks/useTaskStatusMutation';

export default function StatusChanger({ task, className }) {
  const { data: statuses, isSuccess } = useStatusesQuery();

  const taskStatusMutation = useTaskStatusMutation();

  if (!isSuccess) {
    return <Status name={task.statusName} rgb={'transparent'} />;
  }

  const mutableData = {
    id: task.id,
    statusId: task.statusId,
    executorId: task.executorId,
  };

  const options = statuses.map((status) => ({
    value: status.id,
    label: <Status name={status.name} rgb={status.rgb} />,
  }));

  const handleChange = (option) => {
    //setStatusId(option.value);
    taskStatusMutation.mutate({ ...mutableData, statusId: option.value });
  };

  return (
    <Select value={task.statusId} options={options} onChange={handleChange} />
  );
}

const Status = ({ name, rgb }) => {
  return (
    <StatusContainer>
      <StatusIcon rgb={rgb} />
      <StatusName>{name}</StatusName>
    </StatusContainer>
  );
};

const StatusContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StatusIcon = styled.div`
  min-width: 11px;
  width: 11px;
  height: 11px;

  background: ${({ rgb }) => rgb};
  border-radius: 50%;
  margin-right: 11px;
`;

const StatusName = styled.div`
  color: #525460;
  font-size: 14px;
`;
