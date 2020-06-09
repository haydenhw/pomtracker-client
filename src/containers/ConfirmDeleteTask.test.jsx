import React from 'react';
import ReactDOM from 'react-dom';
import ConfirmDeleteTask from './ConfirmDeleteTask';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ConfirmDeleteTask />, div);
  ReactDOM.unmountComponentAtNode(div);
});
