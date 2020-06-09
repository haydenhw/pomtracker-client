import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { changeActiveContextMenu } from '../actions/indexActions';
import Popup from '../components/PopupMenu';
import PopupMenuContent from '../components/PopupMenuContent';
import PopupMenuTrigger from '../components/PopupMenuTrigger';

class ContextMenu extends Component {
  bindBodyClickHandler() {
    document.body.addEventListener('click', this.handleBodyClick);
  }

  handleClick = (evt) => {
    const { isMenuActive, changeActiveContextMenu, parentId } = this.props;
    evt.stopPropagation();

    if (!isMenuActive) {
      changeActiveContextMenu(parentId);
      this.bindBodyClickHandler();
    } else {
      changeActiveContextMenu(null);
    }
  }

  handleBodyClick = (evt) => {
    const { changeActiveContextMenu } = this.props;
    const targetClassName = evt.target.className;

    if (!/context-menu-trigger-element/.test(targetClassName)) {
      changeActiveContextMenu(null);
    }

    document.body.removeEventListener('click', this.handleBodyClick);
  }

  render() {
    const { children, className, isMenuActive } = this.props;

    return (
      <Popup className={className}>
        <div className="popup-wrapper">
          <PopupMenuTrigger handleClick={this.handleClick}>
            <div className="list-item-button list-item-outline-button context-menu-trigger-element">
              <span className="icon-dots context-menu-trigger-element" />
            </div>
          </PopupMenuTrigger>
          <PopupMenuContent
            isActive={isMenuActive}
          >
            {children}
          </PopupMenuContent>
        </div>
      </Popup>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { editMenu } = state;
  const { activeParentId } = editMenu;
  const isMenuActive = activeParentId === ownProps.parentId;

  return {
    isMenuActive,
  };
};

export default connect(mapStateToProps, { changeActiveContextMenu })(ContextMenu);

ContextMenu.propTypes = {
  children: PropTypes.array.isRequired,
  className: PropTypes.string,
  isMenuActive: PropTypes.bool,
  changeActiveContextMenu: PropTypes.func.isRequired,
  parentId: PropTypes.string.isRequired,
};
