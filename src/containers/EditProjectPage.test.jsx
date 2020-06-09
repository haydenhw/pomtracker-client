import React from 'react';
import ReactDOM from 'react-dom';
import EditProjectPage from './EditProjectPage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EditProjectPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});
