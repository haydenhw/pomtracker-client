import React from 'react';
import ReactDOM from 'react-dom';
import WelcomeModal from './WelcomeModal';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<WelcomeModal />, div);
  ReactDOM.unmountComponentAtNode(div);
});
