import React from 'react';
import PropTypes from 'prop-types';

export default function Nav(props) {
 const { activeLink, onTimerLinkClick, onProjectsLinkClick } = props;
 return (
    <nav className="nav">
      <div className="nav-logo-wrapper">
        <h1 className="nav-logo-text">PomTracker</h1>
      </div>
      <div className="nav-link-wrapper">
        <a
          className={`nav-link ${activeLink === 'TIMER' ? 'active-link' : ''}`}
          onClick={onTimerLinkClick}
          role="link"
          tabIndex={0}
        >
          <span className="nav-link-name nav-timer-link-name">Timer</span>
        </a>
      </div>

      <div className="nav-link-wrapper">
        <a
          className={`nav-link ${activeLink === 'PROJECTS' ? 'active-link' : ''}`}
          onClick={onProjectsLinkClick}
          role="link"
          tabIndex={0}
        >
          <span className="nav-link-name">Projects</span>
        </a>
      </div>
    </nav>
  );
}

Nav.propTypes = {
  activeLink: PropTypes.string.isRequired,
  onTimerLinkClick: PropTypes.func.isRequired,
  onProjectsLinkClick: PropTypes.func.isRequired,
};
