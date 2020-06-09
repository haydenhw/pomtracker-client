import React from 'react';
import ReactDOM from 'react-dom';
import AddProjectModal from './AddProjectModal';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddProjectModal />, div);
  ReactDOM.unmountComponentAtNode(div);
});
