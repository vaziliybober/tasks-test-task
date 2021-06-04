import React from 'react';
import styled from '@emotion/styled';

import UnstyledTasksHeader from './TasksHeader';
import UnstyledButton from '../shared/Button';
import TableOfTasks from './TableOfTasks';
// import NewTaskForm from './NewTaskForm';
// import EditTaskForm from './EditTaskForm';

export default function Tasks() {
  const [mode, setMode] = React.useState('view');
  const [selectedTaskId, setSelectedTaskId] = React.useState();

  const forms = {
    view: null,
    create: <div>new</div>,
    edit: <div>{`edit ${selectedTaskId}`}</div>,
  };

  const content = (
    <>
      <Button onClick={() => setMode('create')}>Создать заявку</Button>
      <TableOfTasks
        onClick={(taskId) => {
          setMode('edit');
          setSelectedTaskId(taskId);
        }}
      />
    </>
  );

  return (
    <Container>
      <TasksHeader />
      <TasksBody>
        {mode === 'view' ? (
          <ContentContainer>{content}</ContentContainer>
        ) : (
          <>
            <ContentContainerNarrow>{content}</ContentContainerNarrow>
            <FormContainer>{forms[mode]}</FormContainer>
          </>
        )}
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
  display: flex;
  height: calc(100vh - 65px);
`;

const ContentContainer = styled.div`
  overflow: auto;
  flex-grow: 1;

  padding: 25px 3px;
`;

const ContentContainerNarrow = styled(ContentContainer)`
  width: 530px;
`;

const FormContainer = styled.div`
  overflow: auto;
  width: 975px;

  background: #ecf3f7;
`;

const Button = styled(UnstyledButton)`
  margin-left: 260px;
  margin-bottom: 25px;

  @media (max-width: 1400px) {
    margin-left: 100px;
  }

  @media (max-width: 1000px) {
    margin-left: 15px;
  }
`;
