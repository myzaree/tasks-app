import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';

import './Header.less';
import { Button, LoginModal, Modal } from '@components';
import { AppContext, Types } from '@store';

export const Header: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const { logged } = state.user;
  const { pathname } = useLocation();
  const [loginModalOpen, setLoginModal] = useState<boolean>(false);

  const openLoginModal = () => {
    setLoginModal(true);
  };
  const closeLoginModal = () => setLoginModal(false);

  const logoutHandler = () => {
    dispatch({ type: Types.Logout });
  };

  return (
    <header className="header">
      <img src="images/checkmark.svg" alt="Logo" />
      <h1>Tasks app</h1>
      <ul>
        <Link to="/">
          <li className={pathname === '/' ? 'active' : ''}>Main</li>
        </Link>
        <Link to="/about">
          <li className={pathname === '/about' ? 'active' : ''}>About</li>
        </Link>
      </ul>
      {logged ? (
        <Button title="Logout" onClick={logoutHandler} />
      ) : (
        <Button title="Login" onClick={openLoginModal} />
      )}
      <Modal open={loginModalOpen} onClose={closeLoginModal}>
        <LoginModal onClose={closeLoginModal} />
      </Modal>
    </header>
  );
};
