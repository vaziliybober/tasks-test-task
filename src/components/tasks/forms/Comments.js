import React from 'react';
import './Comments.css';

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
    <div className="Comments">
      {comments.map((c) => {
        return (
          <div className="Comments-comment" key={c.id}>
            <div className="Comments-avatar" />
            <div className="Comments-comment-text">
              <div className="Comments-username">{c.userName}</div>
              <div className="Comments-date">{`${formatDate(
                c.createdAt
              )} прокомментировал`}</div>
              <div
                className="Comments-comment-itself"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(c.comment),
                }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
