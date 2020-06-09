import React from 'react';
import ReactDOM from 'react-dom';
import AddTasksModal from './AddTasksModal';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddTasksModal />, div);
  ReactDOM.unmountComponentAtNode(div);
});
