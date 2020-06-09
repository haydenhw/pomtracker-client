import React from 'react';
import ReactDOM from 'react-dom';
import ConfirmDeleteProject from './ConfirmDeleteProject';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ConfirmDeleteProject />, div);
  ReactDOM.unmountComponentAtNode(div);
});
