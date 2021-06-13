import React from 'react';

import { Snackbar } from '@components';
import { Header } from './header/Header';

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      <Snackbar />
      {children}
    </>
  );
};

export default Layout;
