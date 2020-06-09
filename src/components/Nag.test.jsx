import React from 'react';
import ReactDOM from 'react-dom';
import Nag from './Nag';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Nag />, div);
  ReactDOM.unmountComponentAtNode(div);
});
