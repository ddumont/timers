import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router';
import App from './components/app';
import createHistory from 'history/lib/createHashHistory';

import calendarRoute from './routes/calendar';
import courseRoute from './routes/course';
import gradesRoute from './routes/grades';
import messagesRoute from './routes/messages';
import profileRoute from './routes/profile';

import './stubs/COURSES';
import './index.less';

var rootRoute = {
  component: 'div',
  name: 'home',
  childRoutes: [{
    path: '/',
    component: App,
    childRoutes: [
      calendarRoute,
      courseRoute,
      gradesRoute,
      messagesRoute,
      profileRoute
    ]
  }]
};

render(
  <Router history={createHistory()} routes={rootRoute} />,
  document.getElementById('app')
);
