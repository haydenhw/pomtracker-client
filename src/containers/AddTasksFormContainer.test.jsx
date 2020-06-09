import React from 'react';
import ReactDOM from 'react-dom';
import AddTasksFormContainer from './AddTasksFormContainer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddTasksFormContainer />, div);
  ReactDOM.unmountComponentAtNode(div);
});
