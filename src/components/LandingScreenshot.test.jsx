import React from 'react';
import ReactDOM from 'react-dom';
import LandingScreenshot from './LandingScreenshot';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LandingScreenshot />, div);
  ReactDOM.unmountComponentAtNode(div);
});
