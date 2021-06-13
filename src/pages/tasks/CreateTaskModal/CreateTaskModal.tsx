import React, { useReducer, useState, useContext } from 'react';

import './CreateTaskModal.less';
import { Button, Spinner } from '@components';
import { validateEmail, formReducer } from '@utils';
import { createTask } from '@services';
import { AppContext, Types } from '@store';

interface CreateModalProps {
  onClose: () => void;
}

interface FormErrors {
  username: string | undefined;
  email: string | undefined;
  text: string | undefined;
}

export const CreateTaskModal: React.FC<CreateModalProps> = ({ onClose }) => {
  const { dispatch } = useContext(AppContext);
  const [formData, setFormData] = useReducer(formReducer, {
    username: '',
    email: '',
    text: '',
  });
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({
    username: '',
    email: '',
    text: '',
  });

  const validateForm = (): boolean => {
    let errors: FormErrors = {
      username: '',
      email: '',
      text: '',
    };
    if (!formData.username.length)
      errors = { ...errors, username: 'Username is required.' };
    if (!validateEmail(formData.email))
      errors = { ...errors, email: 'Email must be valid.' };
    if (!formData.text.length)
      errors = { ...errors, text: 'Text is required.' };
    setFormErrors(errors);
    return !errors.username && !errors.email && !errors.text;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      setSubmitting(true);
      const bodyFormData: FormData = new FormData();
      bodyFormData.append('username', formData.username);
      bodyFormData.append('email', formData.email);
      bodyFormData.append('text', formData.text);
      try {
        const result = await createTask(bodyFormData);
        if (result.data && result.data.status === 'ok') {
          dispatch({
            type: Types.AddTask,
            payload: { task: result.data.message },
          });
          dispatch({
            type: Types.ShowSnackbar,
            payload: {
              displayText: 'Task successfuly created!',
              type: 'success',
            },
          });
          onClose();
        } else if (result.data && result.data.status === 'error') {
          const { username, email, text } = result.data.message;
          setFormErrors({ username, email, text });
        }
      } catch (err) {
        dispatch({
          type: Types.ShowSnackbar,
          payload: {
            displayText: err.message,
            type: 'error',
          },
        });
      } finally {
        setSubmitting(false);
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
  };

  return (
    <div className="create_task">
      <h3>Create task</h3>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>
            <p>Username</p>
            <input name="username" type="text" onChange={handleChange} />
            {formErrors.username && (
              <p className="error">{formErrors.username}</p>
            )}
          </label>
        </fieldset>
        <fieldset>
          <label>
            <p>Email</p>
            <input name="email" type="text" onChange={handleChange} />
            {formErrors.email && <p className="error">{formErrors.email}</p>}
          </label>
        </fieldset>
        <fieldset>
          <label>
            <p>Text</p>
            <input name="text" type="text" onChange={handleChange} />
            {formErrors.text && <p className="error">{formErrors.text}</p>}
          </label>
        </fieldset>
        <div className="create_task__actions">
          <Button title="Cancel" onClick={onClose} />
          <Button title="Create" isSubmit style={{ marginLeft: 10 }} primary />
        </div>
        {submitting && <Spinner />}
      </form>
    </div>
  );
};
