import React from 'react';
import PropTypes from 'prop-types';

export default function Welcome(props) {
  const { handleGetStartedClick } = props;

  return (
    <div className="welcome fullscreen-container">
      <h2 className="bounce-in-down-welcome">Welcome to PomTracker!</h2>
      <div className="bounce-in-down-welcome-second">
        <p className="welcome-instructions">Click below to create you first project</p>
        <button
          className="outline-button fade-in-long-delay"
          onClick={handleGetStartedClick}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

Welcome.propTypes = {
  handleGetStartedClick: PropTypes.func.isRequired,
};
