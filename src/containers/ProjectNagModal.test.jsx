import React from 'react';
import ReactDOM from 'react-dom';
import ProjectNagModal from './ProjectNagModal';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ProjectNagModal />, div);
  ReactDOM.unmountComponentAtNode(div);
});
