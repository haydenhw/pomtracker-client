import React from 'react';
import ReactDOM from 'react-dom';
import EditTaskForm from './EditTaskForm';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EditTaskForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});
