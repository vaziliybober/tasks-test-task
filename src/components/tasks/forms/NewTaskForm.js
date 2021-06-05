import React from 'react';
import styled from '@emotion/styled';

import UnstyledFormHeader from './FormHeader';
import FormField from './FormField';
import FormTextarea from './FormTextarea';
import UnstyledButton from '../../shared/Button';

import useNewTaskMutation from '../../../hooks/useNewTaskMutation.js';

export default function NewTaskForm({
  taskId,
  onSuccess = () => {},
  onClose = () => {},
}) {
  const [nameValue, setNameValue] = React.useState('');
  const descriptionRef = React.useRef();

  const newTaskMutation = useNewTaskMutation();

  const handleSave = () => {
    const task = {
      name: nameValue,
      description: descriptionRef.current.value,
    };

    newTaskMutation.mutate(task, {
      onSuccess: (taskId) => {
        setNameValue('');
        descriptionRef.current.value = '';
        onSuccess(taskId);
      },
    });
  };

  return (
    <Container>
      <FormHeader title="Новая заявка" onClose={onClose} />
      <FormBody>
        <FormField title="Название" required>
          <NameTextArea
            value={nameValue}
            onChange={(e) => setNameValue(e.target.value)}
          />
        </FormField>
        <FormField title="Описание">
          <DescriptionTextArea ref={descriptionRef} />
        </FormField>
        <Button
          onClick={handleSave}
          disabled={newTaskMutation.isLoading || !nameValue}
        >
          Сохранить
        </Button>
      </FormBody>
    </Container>
  );
}

const Container = styled.div`
  min-width: 330px;
`;

const FormHeader = styled(UnstyledFormHeader)``;

const FormBody = styled.div`
  padding: 60px 40px 25px 40px;
`;

const NameTextArea = styled(FormTextarea)`
  height: 85px;
  margin-bottom: 22px;
`;

const DescriptionTextArea = styled(FormTextarea)`
  height: 135px;
  margin-bottom: 75px;
`;

const Button = styled(UnstyledButton)`
  font-size: 14px;
`;
