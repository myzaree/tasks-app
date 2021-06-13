import React from 'react';
import ReactDOM from 'react-dom';

import { InterceptorsWrapper } from '@services';
import './index.less';
import Routes from './routes/routes';
import * as serviceWorker from './serviceWorker';
import { AppProvider } from './store/context';

ReactDOM.render(
  <AppProvider>
    <InterceptorsWrapper>
      <Routes />
    </InterceptorsWrapper>
  </AppProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
