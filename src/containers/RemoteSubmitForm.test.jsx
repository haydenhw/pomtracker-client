import React from 'react';
import ReactDOM from 'react-dom';
import RemoteSubmitForm from './RemoteSubmitForm';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RemoteSubmitForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});
