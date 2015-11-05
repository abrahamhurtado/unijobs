import React from 'react';
import { Router } from 'react-router';
import { createHistory } from 'history';

import App from './containers/App';
import rootRoute from '../shared/routes';

export default (
  <Router
    history={ createHistory() }
    routes={ rootRoute }
  />
);
