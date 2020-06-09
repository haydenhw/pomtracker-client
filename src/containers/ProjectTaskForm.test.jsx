import React from 'react';
import ReactDOM from 'react-dom';
import ProjectTaskForm from './ProjectTaskForm';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ProjectTaskForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});
