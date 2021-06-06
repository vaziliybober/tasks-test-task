import React from 'react';
import styled from '@emotion/styled';

import FormField from './FormField';
import FormTextarea from './FormTextarea';
import UnstyledButton from '../../shared/Button';

import useCommentTaskMutation from '../../../hooks/useCommentTaskMutation';

export default function CommentAdder({ task, className }) {
  const commentTaskMutation = useCommentTaskMutation();

  const [commentValue, setCommentValue] = React.useState('');

  React.useEffect(() => {
    setCommentValue('');
  }, [task.id]);

  const mutableData = {
    id: task.id,
    statusId: task.statusId,
    executorId: task.executorId,
  };

  const handleSaveComment = (e) => {
    e.preventDefault();

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
    <form className={className} onSubmit={handleSaveComment}>
      <CommentField title="Добавление комментариев" required>
        <CommentTextArea
          value={commentValue}
          onChange={(e) => setCommentValue(e.target.value)}
        />
      </CommentField>
      <Button
        type="submit"
        disabled={commentTaskMutation.isLoading || !commentValue}
      >
        Сохранить
      </Button>
      {commentTaskMutation.isError && (
        <Error>Не удалось отправить комментарий</Error>
      )}
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

const Error = styled.span`
  margin-left: 10px;
  color: red;
`;
