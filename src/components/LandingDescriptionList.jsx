import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

export default function LandingDescriptionList({ copy,  handleStartClick }) {
  const descriptionItems = copy.map((copyItem) => {
    const { description } = copyItem;
    return (
      <li key={shortid.generate()} className="lp-description-item">
        <span className="lp-description-item-icon icon-check-square-3" />
        <span className="lp-description-item-text">
          {description}
        </span>
      </li>
    );
  });

  return (
    <div className="lp-description-list-wrapper">
      <ul className="lp-description-list">
        {descriptionItems}
      </ul>
      <button className="outline-button description-start-button" onClick={handleStartClick}>Start Tracking</button>
    </div>
  );
}
