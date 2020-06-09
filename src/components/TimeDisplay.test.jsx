import React from 'react';
import ReactDOM from 'react-dom';
import TimeDisplay from './TimeDisplay';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TimeDisplay />, div);
  ReactDOM.unmountComponentAtNode(div);
});
