import React from 'react';
import ReactDOM from 'react-dom';
import TotalTime from './TotalTime';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TotalTime />, div);
  ReactDOM.unmountComponentAtNode(div);
});
