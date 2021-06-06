import React from 'react';
import styled from '@emotion/styled';

import DOMPurify from 'dompurify';

import { formatId } from '../../../shared';

import calendarImg from '../../../images/calendar.svg';

import FormHeader from './FormHeader';
import UnstyledFormField from './FormField';
import Comments from './Comments';
import UnstyledCommentAdder from './CommentAdder';
import UnstyledStatusChanger from './StatusChanger';
import ExecutorChanger from './ExecutorChanger';

import useTaskQuery from '../../../hooks/useTaskQuery';

export default function EditTaskForm({ taskId, onClose = () => {} }) {
  const { data: task, status } = useTaskQuery(taskId);

  if (status === 'loading') {
    return 'Loading task...';
  }

  if (status === 'error') {
    return "Couldn't load the task";
  }

  const comments = task.lifetimeItems.filter((item) => item.comment);

  return (
    <Container>
      <FormHeader
        title={`№ ${formatId(task.id)}`}
        description={task.name}
        onClose={onClose}
      />
      <FormBody>
        <MainBlock>
          <DescriptionField title="Описание">
            <TextBlock
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(task.description),
              }}
            />
          </DescriptionField>
          <CommentAdder task={task} />
          <Comments comments={comments} />
        </MainBlock>
        <Sidebar>
          <StatusChanger task={task} />
          <InitiatorField title="Заявитель">
            <TextBlock>{task.initiatorName}</TextBlock>
          </InitiatorField>
          <FormField title="Создана">
            <TextBlock>{task.initiatorName}</TextBlock>
          </FormField>
          <FormField title="Исполнитель">
            <ExecutorChanger task={task} />
          </FormField>
          <FormField title="Приоритет">
            <TextBlock>{task.priorityName}</TextBlock>
          </FormField>
          <FormField title="Срок">
            <DueDate task={task} />
          </FormField>
          <FormField title="Теги">
            <Tags task={task} />
          </FormField>
        </Sidebar>
      </FormBody>
    </Container>
  );
}

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString('ru', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
  });
};

function DueDate({ task, className }) {
  return (
    <DueDateContainer className={className}>
      <DueDateImg src={calendarImg} alt="date" />
      <TextBlock>{`${formatDate(task.resolutionDatePlan)} г.`}</TextBlock>
    </DueDateContainer>
  );
}

function Tags({ task, className }) {
  return (
    <TagsContainer className={className}>
      {task.tags.map((tag) => (
        <Tag key={tag.id}>{tag.name}</Tag>
      ))}
    </TagsContainer>
  );
}

const TagsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Tag = styled.div`
  align-self: flex-start;
  margin-bottom: 5px;

  background: #fff;
  padding: 4px 11px 3px 10px;
  color: #9da1aa;
  font-size: 12px;
  border: 1px solid #9da1aa;
  border-radius: 1rem;
`;

const DueDateContainer = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;
`;

const DueDateImg = styled.img`
  width: 18px;
  height: 15px;
  margin-right: 7px;
`;

const Container = styled.div`
  height: 100%;
  min-width: 740px;
`;

const FormBody = styled.div`
  display: flex;
  min-height: calc(100% - 60px);
`;

const MainBlock = styled.div`
  //background: lightskyblue;
  padding: 28px 30px 20px 40px;
  min-width: 500px;
  max-width: calc(100% - 240px);
  width: 45vw;
`;

const Sidebar = styled.div`
  width: 240px;
  flex-shrink: 0;

  //background: lightseagreen;
  padding: 28px;
  border-left: 1px solid #d7dce0;
`;

const TextBlock = styled.div`
  color: #060606;
  font-size: 14px;
`;

const FormField = styled(UnstyledFormField)`
  margin-bottom: 32px;
`;

const DescriptionField = styled(FormField)`
  margin-bottom: 50px;

  word-wrap: break-word;
  overflow-wrap: break-word;
  word-break: break-word;
`;

const CommentAdder = styled(UnstyledCommentAdder)`
  margin-bottom: 45px;
`;

const StatusChanger = styled(UnstyledStatusChanger)`
  margin-bottom: 35px;
`;

const InitiatorField = styled(FormField)`
  margin-bottom: 55px;
`;
