import React from 'react';
import PropTypes from 'prop-types';

export default function List(props) {
  const { children, className, items, renderItem } = props;
  const list = items && items.map(renderItem);
  return (
    <div className={className || ''} >
      {children}
      {list}
    </div>
  );
}

List.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  items: PropTypes.array.isRequired,
  renderItem: PropTypes.func.isRequired,
};
