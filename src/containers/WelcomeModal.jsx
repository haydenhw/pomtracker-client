import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { changeModalType } from '../actions/indexActions';

import Welcome from '../components/Welcome';

function WelcomeModal(props) {
  const { changeModalType } = props;

  return (
    <Welcome handleGetStartedClick={() => changeModalType('ADD_PROJECT')} />
  );
}

export default connect(null, { changeModalType })(WelcomeModal);

WelcomeModal.propTypes = {
  changeModalType: PropTypes.func.isRequired,
};
