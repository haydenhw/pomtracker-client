import React from 'react';
import PropTypes from 'prop-types';


export default function ListItem({ children, handleClick, isActive, isSelected }) {
  return (
    <div
      className={`list-item ${isActive ? 'active' : ''} ${isSelected ? 'selected' : ''}`}
      onClick={handleClick}
      role="option"
      tabIndex={0}
    >
      {children}
    </div>
  );
}

ListItem.propTypes = {
  children: PropTypes.array.isRequired,
  handleClick: PropTypes.func,
  isActive: PropTypes.bool,
  isSelected: PropTypes.bool,
};
