import React, { useContext, useReducer, useState } from 'react';

import './LoginModal.less';
import { Button, Spinner } from '@components';
import { AppContext, Types } from '@store';
import { formReducer } from '@utils';
import { login } from '@services';

interface LoginModalProps {
  onClose: () => void;
}

interface LoginErrors {
  username: string | undefined;
  password: string | undefined;
}

export const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
  const { dispatch } = useContext(AppContext);
  const [loginData, setLoginData] = useReducer(formReducer, {
    username: '',
    password: '',
  });
  const [authenticating, setAuthenticating] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<LoginErrors>({
    username: '',
    password: '',
  });

  const validateForm = (): boolean => {
    let errors: LoginErrors = { username: '', password: '' };
    if (!loginData.username.length)
      errors = { ...errors, username: 'Username is required.' };
    if (!loginData.password.length)
      errors = { ...errors, password: 'Password is required.' };
    setFormErrors(errors);
    return !errors.username && !errors.password;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      setAuthenticating(true);
      const bodyLoginData: FormData = new FormData();
      bodyLoginData.append('username', loginData.username);
      bodyLoginData.append('password', loginData.password);
      const result = await login(bodyLoginData);
      if (result.data && result.data.status === 'ok') {
        dispatch({ type: Types.Login });
        localStorage.setItem('token', result.data.message.token);
        onClose();
      } else if (result.data && result.data.status === 'error') {
        const { username, password } = result.data.message;
        setFormErrors({ username, password });
      }
      setAuthenticating(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      name: event.target.name,
      value: event.target.value,
    });
  };

  return (
    <div className="login">
      <h3>Login</h3>
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
            <p>Password</p>
            <input name="password" type="password" onChange={handleChange} />
            {formErrors.password && (
              <p className="error">{formErrors.password}</p>
            )}
          </label>
        </fieldset>
        <div className="login__button">
          <Button title="Login" isSubmit primary />
        </div>
        {authenticating && <Spinner />}
      </form>
    </div>
  );
};
