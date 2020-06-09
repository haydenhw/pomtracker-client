import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Provider } from 'react-redux';
import TagManager from 'react-gtm-module';
import ReactGA from 'react-ga';

import store from './redux-files/store';

import App from './containers/App';
import LandingPage from './containers/LandingPage';

import './helpers/polyfill';
import './styles/index.scss';
import './styles/icons/icomoon/style.css';

if (process.env.NODE_ENV === 'production') {
  TagManager.initialize({
    gtmId: 'GTM-KJWS7WT',
  });

  ReactGA.initialize('UA-160393427-3');
}

render((
  <Provider store={store}>
    <Router>
      <Route path="/app">
        <App />
      </Route>
      <Route exact path="/">
        <LandingPage />
      </Route>
    </Router>
  </Provider>
), document.getElementById('root'));
