import React from 'react';
import ReactDOM from 'react-dom';
import LandingSections from './LandingSections';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LandingSections />, div);
  ReactDOM.unmountComponentAtNode(div);
});
