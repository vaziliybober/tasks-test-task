import React from 'react';

import FormHeader from './FormHeader';

export default function EditTaskForm({
  taskId,
  onSuccess = () => {},
  onClose = () => {},
}) {
  return <FormHeader title="№ 67 304" onClose={onClose} />;
}
