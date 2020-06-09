import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

export default function LandingSections({ copy }) {
  const sectionItems = copy.map((copyItem) => {
    const { title, description } = copyItem;
    return (
      <section key={shortid.generate()} className="lp-section">
        <h1 className="lp-heading">{title}</h1>
        <p className="lp-sub-heading">{description}</p>
      </section>
    );
  });

  return (
    <div className="lp-sections">
      {sectionItems}
    </div>
  );
}
