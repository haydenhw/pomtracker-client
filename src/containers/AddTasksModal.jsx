import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { changeModalType } from '../actions/indexActions';

import AddTasksFormContainer from './AddTasksFormContainer';

function AddTasksModal(props) {
  const { isOnboardingActive, selectedProjectName } = props;

  return (
    <AddTasksFormContainer
      formType={isOnboardingActive ? 'ONBOARDING' : 'MODAL'}
      title="Add tasks for project "
      titleName={selectedProjectName}
    />
  );
}

const mapStateToProps = (state) => {
  const { modal, projects } = state;
  const { isOnboardingActive } = modal;
  const { selectedProjectId } = projects;

  const selectedProjectName = projects.items.length > 0
    ? projects.items.find(project => project.clientId === selectedProjectId).projectName
    : null;

  return {
    isOnboardingActive,
    selectedProjectName,
  };
};

export default connect(mapStateToProps, { changeModalType })(AddTasksModal);

AddTasksModal.propTypes = {
  isOnboardingActive: PropTypes.bool.isRequired,
  selectedProjectName: PropTypes.string.isRequired,
};
