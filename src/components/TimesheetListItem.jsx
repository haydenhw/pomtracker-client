import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import { secondsToHMMSS } from '../helpers/time';

import ListItem from './ListItem';
import TimesheetColumn from './TimesheetColumn';

export default function TimesheetListItem(props) {
  const {
    actionIconClass,
    children,
    isActive,
    isSelected,
    handleItemClick,
    handlePlayClick,
    time,
    title,
  } = props;

  return (
    <ListItem
      key={shortid.generate()}
      isActive={isActive}
      isSelected={isSelected}
      handleClick={handleItemClick}
    >
      <TimesheetColumn colNumber="1">
        <div className="list-item-button">
          <span className="list-item-letter-icon"> {title[0].toUpperCase()}</span>
        </div>
      </TimesheetColumn>
      <TimesheetColumn colNumber="2">
        <div>
          <h2 className="timesheet-col-title">{title}</h2>
          <div className="timesheet-col-time">{secondsToHMMSS(time)}</div>
        </div>
      </TimesheetColumn>
      <TimesheetColumn colNumber="3">
        <div
          className={`list-item-button list-item-${isActive ? 'stop' : 'play'} 
          ${isActive ? 'active' : ''}`}
          onClick={handlePlayClick}
          role="button"
          tabIndex={0}
        >
          <span className={`icon-${isActive ? 'stop' : actionIconClass}`} />
        </div>
        { children }
      </TimesheetColumn>
      <TimesheetColumn colNumber="4" />
    </ListItem>
  );
}

TimesheetListItem.propTypes = {
  actionIconClass: PropTypes.string,
  children: PropTypes.node.isRequired,
  isActive: PropTypes.bool,
  isSelected: PropTypes.bool,
  handleItemClick: PropTypes.func,
  handlePlayClick: PropTypes.func.isRequired,
  time: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};
