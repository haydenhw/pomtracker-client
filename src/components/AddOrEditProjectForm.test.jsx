import React from 'react';
import ReactDOM from 'react-dom';
import AddOrEditProjectForm from './AddOrEditProjectForm';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddOrEditProjectForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});
