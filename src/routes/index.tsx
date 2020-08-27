import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Home from '../pages/Home';
import WebPlayer from '../pages/WebPlayer';

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={Home} />

    <Route path="/web-player" component={WebPlayer} isPrivate />
  </Switch>
);

export default Routes;
