import React from 'react';
import PropTypes from 'prop-types';
import CircularProgressbar from 'react-circular-progressbar';

import { secondsToMSS } from '../helpers/time';
import { showProgressBar, devStyle } from '../config/devSettings';

import EditInlineText from '../containers/EditInlineText';

const getPercentage = () => '';

export default function TimeDisplay(props) {
  const {
    handlePlayClick,
    handleStopClick,
    isTimerActive,
    isTimerControlActive,
    setStartTime,
    startCount,
    time,
  } = props;

  let handleButtonClick = null;
  if (isTimerControlActive) {
    handleButtonClick = isTimerActive ? handleStopClick : handlePlayClick;
  }

  const progressPercentage = isTimerActive ? (1 - (time / startCount)) * 100 : 100;
  const displayTime = time || startCount;
  return (
    <div className="timer">
      <div className="progress-bar-container" />
      {showProgressBar && <CircularProgressbar
        initialAnimation
        percentage={progressPercentage}
        strokeWidth={4}
        textForPercentage={getPercentage}
      />}
      <div style={devStyle || null} className="timer-content">
        <EditInlineText
          className={`edit-time ${isTimerActive ? 'fade-in-fast' : 'hide'}`}
          handleChange={setStartTime}
          text={secondsToMSS(displayTime)}
        />
        <div
          className={`timer-control ${isTimerControlActive ? '' : 'disabled'} `}
          onClick={handleButtonClick}
          role="button"
          tabIndex={0}
        >
          <div className={`${isTimerActive ? 'icon-stop-rounded' : 'icon-play-rounded'}`} />
        </div>
      </div>
    </div>
  );
}

TimeDisplay.propTypes = {
  handlePlayClick: PropTypes.func.isRequired,
  handleStopClick: PropTypes.func.isRequired,
  isTimerActive: PropTypes.bool,
  isTimerControlActive: PropTypes.bool,
  setStartTime: PropTypes.func.isRequired,
  startCount: PropTypes.number.isRequired,
  time: PropTypes.number,
};
