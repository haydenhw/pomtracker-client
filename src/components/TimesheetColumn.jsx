import React from 'react';
import PropTypes from 'prop-types';

export default function TimesheetColumn({ children, colNumber }) {
  return (
    <div className={`timesheet-col${colNumber} timesheet-col`}>
      {children}
    </div>
  );
}

TimesheetColumn.propTypes = {
  children: PropTypes.node,
  colNumber: PropTypes.string.isRequired,
};
