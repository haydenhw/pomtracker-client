import React from 'react';
import PropTypes from 'prop-types';

export default function PopupMenu(props) {
  const { className, children } = props;

  return (
    <div className={`popup-menu ${className || ''}`}>
      {children}
    </div>
  );
}

PopupMenu.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
