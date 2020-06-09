import React from 'react';
import ReactDOM from 'react-dom';
import TimerPage from './TimerPage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TimerPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});
