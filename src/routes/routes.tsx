import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Spinner } from '@components';
import Layout from '../layout';

const About = lazy(() => import('../pages/about/About'));
const Tasks = lazy(() => import('../pages/tasks/Tasks'));

export default (): React.ReactElement => (
  <Router>
    <Layout>
      <Switch>
        <Suspense fallback={<Spinner />}>
          <Route exact path="/about" component={About} />
          <Route exact path="/" component={Tasks} />
          {/* <Route component={NotFound} /> */}
        </Suspense>
      </Switch>
    </Layout>
  </Router>
);
