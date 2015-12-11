import React from 'react';
import { Router } from 'react-router';
import { createHistory } from 'history';
import Provider from '../shared/components/Provider';
import routes from '../shared/routes';

export default (
  <Provider>
    <Router
      history={ createHistory() }
      routes={ routes }
    />
  </Provider>
);
