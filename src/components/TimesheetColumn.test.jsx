import React from 'react';
import ReactDOM from 'react-dom';
import TimesheetColumn from './TimesheetColumn';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TimesheetColumn />, div);
  ReactDOM.unmountComponentAtNode(div);
});
