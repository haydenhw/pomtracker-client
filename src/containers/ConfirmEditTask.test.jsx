import React from 'react';
import ReactDOM from 'react-dom';
import ConfirmEditTask from './ConfirmEditTask';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ConfirmEditTask />, div);
  ReactDOM.unmountComponentAtNode(div);
});
