import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export default function callOnTargetUpdate(getTargetInfo, onTargetUpdate) {
  return (WrappedComponent) => {
    class BaseComponent extends Component {
      componentDidUpdate(prevProps) {
        const { targetPropKey, targetValue } = getTargetInfo(this.props);

        if (
          (prevProps[targetPropKey] !== targetValue) &&
          (this.props[targetPropKey] === targetValue)) {
          onTargetUpdate(this.props);
        }
      }

      render() {
        return <WrappedComponent {...this.props} />;
      }
    }
    const mapStateToProps = state => ({ remoteSubmitForm: state.customForm.remoteSubmitForm });
    return connect(mapStateToProps)(BaseComponent);
  };
}

callOnTargetUpdate.propTypes = {
  targetValue: PropTypes.string.isRequired,
};
