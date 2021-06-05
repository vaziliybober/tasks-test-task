import React from 'react';
import styled from '@emotion/styled';

import DOMPurify from 'dompurify';

const formatDate = (dateString) => {
  const date = new Date(dateString);

  return date.toLocaleString('ru', {
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
};

export default function Comments({ comments }) {
  return (
    <Container>
      {comments.map((c) => {
        return (
          <Comment key={c.id}>
            <Avatar />
            <div>
              <Username>{c.userName}</Username>
              <DateTime>{`${formatDate(
                c.createdAt
              )} прокомментировал`}</DateTime>
              <CommentText
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(c.comment),
                }}
              ></CommentText>
            </div>
          </Comment>
        );
      })}
    </Container>
  );
}

const Container = styled.div``;

const Comment = styled.div`
  display: flex;
  margin-bottom: 30px;
`;

const Avatar = styled.div`
  min-width: 40px;
  width: 40px;
  height: 40px;
  margin-right: 12px;

  background: #f5f5f5;
  border: 1px solid #c5cdd3;
  border-radius: 50%;
`;

const Username = styled.div`
  margin-bottom: 12px;
  margin-top: 7px;

  color: #525460;
  font-family: 'Ubuntu';
  font-weight: normal;
  font-size: 14px;
`;

const DateTime = styled.div`
  margin-bottom: 18px;

  color: #63677c;
  font-size: 12px;
  font-weight: normal;
  border-radius: 5px;
`;

const CommentText = styled.div`
  background: #e3e9f4;
  padding: 10px;
  color: #060606;
  border-radius: 5px;
  word-wrap: break-word;
  overflow-wrap: break-word;
  word-break: break-word;
`;
