import React from 'react';
import styled from '@emotion/styled';

import _ from 'lodash';

import { formatId } from '../../shared';

import useTasksQuery from '../../hooks/useTasksQuery';
import usePrioritiesQuery from '../../hooks/usePrioritiesQuery';
import useStatusesQuery from '../../hooks/useStatusesQuery';
import useUsersQuery from '../../hooks/useUsersQuery';

export default function TableOfTasks({ onClick = () => {} }) {
  const { data: tasks, status } = useTasksQuery();

  if (status === 'loading') {
    return <Loading>Загружаем заявки...</Loading>;
  }

  if (status === 'error') {
    return (
      <Error>Не удалось загрузить заявки. Попробуйте обновить страницу.</Error>
    );
  }

  return (
    <Table>
      <thead>
        <TrHead>
          {['', 'ID', 'Название', 'Статус', 'Исполнитель'].map((title) => (
            <Th key={title}>
              <ColumnTitle>{title}</ColumnTitle>
            </Th>
          ))}
        </TrHead>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <TaskRow task={task} onClick={() => onClick(task.id)} key={task.id} />
        ))}
      </tbody>
    </Table>
  );
}

/* -------------------------------------- */

const usePriority = (priorityId) => {
  const { data: priorities } = usePrioritiesQuery();
  return _.find(priorities, (p) => p.id === priorityId);
};

const useStatus = (statusId) => {
  const { data: statuses } = useStatusesQuery();
  return _.find(statuses, (p) => p.id === statusId);
};

const useExecutor = (executorId) => {
  const { data: executors } = useUsersQuery();
  return _.find(executors, (p) => p.id === executorId);
};

function TaskRow({ task, onClick }) {
  const priority = usePriority(task.priorityId) || {};
  const status = useStatus(task.statusId) || {};
  const executor = useExecutor(task.executorId) || {};

  const columnsContent = [
    <PriorityBar rgb={priority.rgb} />,
    <TaskID>{formatId(task.id)}</TaskID>,
    <TaskName>{task.name}</TaskName>,
    <TaskStatus rgb={status.rgb}>{status.name || task.statusName}</TaskStatus>,
    <ExecutorName>{executor.name || task.executorName}</ExecutorName>,
  ];

  return (
    <TrBody onClick={onClick}>
      {columnsContent.map((colContent, i) => (
        <Td key={i}>{colContent}</Td>
      ))}
    </TrBody>
  );
}

/* -------------------------------------- */

const Table = styled.table`
  border-collapse: collapse;
`;

const Tr = styled.tr`
  border-bottom: 1px solid #dae0e7;
`;

const TrHead = styled(Tr)`
  text-align: left;
`;

const ColumnTitle = styled.div`
  font-family: 'Ubuntu';
  font-weight: normal;
  color: #404147;
`;

const Th = styled.th`
  padding-top: 3px;
  padding-bottom: 6px;

  &:first-of-type {
    padding-right: 15px;
  }

  &:not(:first-of-type, :last-child) ${ColumnTitle} {
    border-right: 1px solid #dae0e7;
  }

  &:not(:first-of-type) ${ColumnTitle} {
    padding-left: 15px;
    padding-right: 15px;
  }
`;

const TrBody = styled(Tr)`
  &:hover {
    background: #999;
    cursor: pointer;
  }
`;

const Td = styled.td`
  padding-top: 2px;
  padding-bottom: 2px;

  color: #525460;

  &:not(:first-of-type) {
    padding-left: 15px;
    padding-right: 15px;
  }
`;

const PriorityBar = styled.div(({ rgb }) => ({
  height: '50px',
  width: '5px',

  background: rgb,
}));

const TaskID = styled.div`
  white-space: nowrap;
`;

const TaskName = styled.div`
  width: 395px;
  height: 100%;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  line-height: 15px;
  max-height: 30px;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  overflow-wrap: break-word;
  word-break: break-word;
`;

const TaskStatus = styled.div`
  display: inline;

  background: ${({ rgb }) => rgb};
  font-size: 12px;
  text-transform: lowercase;
  white-space: nowrap;
  color: ${({ rgb }) => rgb && '#fff'};
  padding: 3px 16px;
  border-radius: 10px;
`;

const ExecutorName = styled.div``;

const Loading = styled.div`
  margin-left: 20px;
  margin-top: 10px;
`;

const Error = styled.div`
  color: red;
  margin-left: 20px;
  margin-top: 10px;
`;
