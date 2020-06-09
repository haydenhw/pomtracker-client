import React from 'react';
import ReactDOM from 'react-dom';
import TimesheetListItem from './TimesheetListItem';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TimesheetListItem />, div);
  ReactDOM.unmountComponentAtNode(div);
});
