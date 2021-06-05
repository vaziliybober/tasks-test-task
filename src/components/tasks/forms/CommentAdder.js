import React from 'react';
import styled from '@emotion/styled';

import FormField from './FormField';
import FormTextarea from './FormTextarea';
import UnstyledButton from '../../shared/Button';

import useCommentTaskMutation from '../../../hooks/useCommentTaskMutation';

export default function CommentAdder({ task, className }) {
  const commentTaskMutation = useCommentTaskMutation();

  const [commentValue, setCommentValue] = React.useState('');

  const mutableData = {
    id: task.id,
    statusId: task.statusId,
    executorId: task.executorId,
  };

  const handleSaveComment = () => {
    commentTaskMutation.mutate(
      { ...mutableData, comment: commentValue },
      {
        onSuccess: () => {
          setCommentValue('');
        },
      }
    );
  };

  return (
    <form className={className}>
      <CommentField title="Добавление комментариев" required>
        <CommentTextArea
          value={commentValue}
          onChange={(e) => setCommentValue(e.target.value)}
        />
      </CommentField>
      <Button
        onClick={handleSaveComment}
        disabled={commentTaskMutation.isLoading || !commentValue}
      >
        Сохранить
      </Button>
    </form>
  );
}

const CommentField = styled(FormField)`
  margin-bottom: 20px;
`;

const CommentTextArea = styled(FormTextarea)`
  height: 140px;
`;

const Button = styled(UnstyledButton)`
  font-size: 14px;
`;
