import React from 'react';
import ReactDOM from 'react-dom';
import AddTasksForm from './AddTasksForm';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddTasksForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});
