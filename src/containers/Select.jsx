import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import PopupMenu from '../components/PopupMenu';
import PopupMenuTrigger from '../components/PopupMenuTrigger';
import PopupMenuContent from '../components/PopupMenuContent';

export default class Select extends Component {
  constructor() {
    super();

    this.state = {
      isActive: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isActive === true && this.state.isActive === false) {
      document.body.removeEventListener('click', this.handleBodyClick);
    }
  }

  toggleIsActive = () => {
    const { isActive } = this.state;
    this.setState({ isActive: !isActive });
    document.body.addEventListener('click', this.handleBodyClick);
  }

  handleBodyClick = (evt) => {
    // TODO consider finding a more robust way to achieve this, ie without relying on classnames https://blog.campvanilla.com/reactjs-dropdown-menus-b6e06ae3a8fe
    const targetClassNames = evt.target.className.split(' ');

    if (
      targetClassNames.includes('option') &&
      targetClassNames.includes('option-item')
    ) {
      this.setState({ isActive: false });
    }
  }

  handleChange = optionId => () => {
    this.props.onChange(optionId);
    this.toggleIsActive();
  }


  renderOptions() {
    const { items, className } = this.props;

    return items.map((item) => {
      return (
        <li
          className={`${className || ''} option`}
          key={shortid.generate()}
          onClick={this.handleChange(item.id)}
          role="option"
        >
          <span className={`${className || ''} option-item`}>{item.name}</span>
        </li>
      );
    });
  }

  renderTest() {
    if (this.state.isActive) {
      return <div className="trans-test" />;
    }

    return null;
  }

  render() {
    const { isActive } = this.state;
    const { className } = this.props;
    return (
      <PopupMenu className={`${className || ''} select`}>
        <div className="popup-wrapper">
          <PopupMenuTrigger handleClick={this.toggleIsActive}>
            {this.props.children}
          </PopupMenuTrigger>
          <PopupMenuContent isActive={isActive}>
            {this.renderOptions()}
          </PopupMenuContent>
        </div>
      </PopupMenu>
    );
  }
}

Select.propTypes = {
  children: PropTypes.object,
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
};
