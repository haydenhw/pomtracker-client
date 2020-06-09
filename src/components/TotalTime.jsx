import React from 'react';
import PropTypes from 'prop-types';

export default function TotalTime(props) {
  const { time } = props;

  return (
    <div className="total-time list-item">
      <div className="timesheet-col1 timesheet-col total-time-total"><span>Total:</span></div>
      <div className="timesheet-col2 timesheet-col total-time-time"><span>{time}</span></div>
      <div className="timesheet-col3 timesheet-col" />
    </div>
  );
}

TotalTime.propTypes = {
  time: PropTypes.string.isRequired,
};
