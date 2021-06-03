import React from 'react';
import styled from '@emotion/styled';

import UnstyledTasksHeader from './TasksHeader';
import UnstyledButton from '../shared/Button';
import TableOfTasks from './TableOfTasks';
import NewTaskForm from './NewTaskForm';
import EditTaskForm from './EditTaskForm';

export default function Tasks() {
  return (
    <Container>
      <TasksHeader />
      <TasksBody>
        <Button>Создать заявку</Button>
        <TableOfTasks />
      </TasksBody>
    </Container>
  );
}

const Container = styled.div`
  overflow-x: hidden;
`;

const TasksHeader = styled(UnstyledTasksHeader)`
  height: 65px;
`;

const TasksBody = styled.div`
  padding: 25px 3px;
`;

const Button = styled(UnstyledButton)`
  margin-left: 260px;
  margin-bottom: 25px;
`;
