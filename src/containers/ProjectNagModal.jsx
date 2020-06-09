import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { closeModal } from '../actions/indexActions';

import Nag from '../components/Nag';

const handleActionButtonClick = (closeModal, history) => () => {
  closeModal(() => history.push('/app/new-project'));
};

const ProjectNagModal = function({ closeModal, history }) {
  return (
    <Nag
      actionButtonText="ADD PROJECT"
      nagMessage="Please add a project before continuing."
      onActionButtonClick={handleActionButtonClick(closeModal, history)}
      title="No projects added yet"
    />
  );
};

export default connect(() => ({}), { closeModal })(ProjectNagModal);

ProjectNagModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};
