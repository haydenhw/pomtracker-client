import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { closeModal } from '../actions/indexActions';

import RootModal from '../components/RootModal';
import AddProjectModal from './AddProjectModal';
import AddTasksModal from './AddTasksModal';
import ConfirmEditTask from './ConfirmEditTask';
import ConfirmDeleteProject from './ConfirmDeleteProject';
import ConfirmDeleteTask from './ConfirmDeleteTask';
import EditTaskModal from './EditTaskModal';
import ProjectNagModal from './ProjectNagModal';
import WelcomeModal from './WelcomeModal';

function ModalController(props) {
  const MODAL_COMPONENTS = {
    ADD_PROJECT: AddProjectModal,
    ADD_TASKS: AddTasksModal,
    CONFIRM_DELETE_PROJECT: ConfirmDeleteProject,
    CONFIRM_DELETE_TASK: ConfirmDeleteTask,
    CONFIRM_EDIT_TASK: ConfirmEditTask,
    EDIT_TASK: EditTaskModal,
    PROJECT_NAG: ProjectNagModal,
    WELCOME: WelcomeModal,
  };

  const {
    closeModal,
    showModal,
    modalClass,
    modalProps,
    modalType,
    rootModalClass,
    style,
  } = props;

  if (!showModal) {
    return null;
  }

  const SpecificModal = MODAL_COMPONENTS[modalType];
  return (
    <RootModal className={rootModalClass}>
      <div className={`modal ${modalClass}`} style={style}>
        <span
          className="modal-close"
          onClick={closeModal}
          role="button"
          tabIndex={0}
        >
            &times;
        </span>
        <SpecificModal {...modalProps} />
      </div>
    </RootModal>
  );
}

const mapStateToProps = (state) => {
  const { modal } = state;
  const { showModal, modalProps, modalType } = modal;

  return {
    showModal,
    modalProps,
    modalType,
  };
};

export default connect(mapStateToProps, { closeModal })(ModalController);

ModalController.propTypes = {
  closeModal: PropTypes.func.isRequired,
  showModal: PropTypes.bool,
  modalClass: PropTypes.string,
  modalProps: PropTypes.object,
  modalType: PropTypes.string.isRequired,
  rootModalClass: PropTypes.string,
  style: PropTypes.object,
};