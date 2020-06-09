import React from 'react';
import PropTypes from 'prop-types';

export default function LandingHeading({ handleStartClick }) {
  return (
    <div className="lp-heading-wrapper">
      {/* <img className="lp-heading-logo" src="/images/tomato-icon-2.svg" alt=""/> */}
      <h1 className="lp-heading">PomTracker</h1>
      <p className="lp-sub-heading">A pomodoro timer with integrated time tracking.</p>
      <button className="outline-button heading-start-button" onClick={handleStartClick}>Start Tracking</button>
    </div>
  );
}
