import React from 'react';
import ReactDOM from 'react-dom';
import LandingHeading from './LandingHeading';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LandingHeading />, div);
  ReactDOM.unmountComponentAtNode(div);
});
