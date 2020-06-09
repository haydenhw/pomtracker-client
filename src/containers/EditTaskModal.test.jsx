import React from 'react';
import ReactDOM from 'react-dom';
import EditTaskModal from './EditTaskModal';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EditTaskModal />, div);
  ReactDOM.unmountComponentAtNode(div);
});
