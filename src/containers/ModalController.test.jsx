import React from 'react';
import ReactDOM from 'react-dom';
import ModalController from './ModalController';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ModalController />, div);
  ReactDOM.unmountComponentAtNode(div);
});
