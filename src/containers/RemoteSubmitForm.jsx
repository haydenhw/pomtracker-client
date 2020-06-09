import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const RemoteSubmitForm = (props) => {
  const { children, remoteSubmitForm } = props;
  return React.cloneElement(children, { ...props }, { remoteSubmitForm });
};

const mapStateToProps = (state) => {
  const { remoteSubmitForm } = state.customForm;
  return { remoteSubmitForm };
};

export default connect(mapStateToProps)(RemoteSubmitForm);

RemoteSubmitForm.propTypes = {
  children: PropTypes.node.isRequired,
  remoteSubmitForm: PropTypes.string,
};
