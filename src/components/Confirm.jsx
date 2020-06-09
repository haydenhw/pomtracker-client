import React from 'react';
import PropTypes from 'prop-types';

export default function Confirm({ onCancel, onDangerClick, dangerText, title }) {
  return (
    <div className="confirm">
      {title}
      <p className="confirm-danger-text">{dangerText}</p>
      <div className="confirm-button-group">
        <button className="confirm-button outline-button" onClick={onCancel}>Cancel</button>
        <button className="confirm-button outline-button" onClick={onDangerClick}>Confirm</button>
      </div>
    </div>
  );
}

Confirm.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onDangerClick: PropTypes.func.isRequired,
  dangerText: PropTypes.node.isRequired,
  title: PropTypes.node,
};
