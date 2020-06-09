import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { closeModal, updateTask, toggleEditTaskModal } from '../actions/indexActions';

import Confirm from '../components/Confirm';

const updateTaskAndCloseModal = (updateTaskParams, updateTask, closeModal) => () => {
  updateTask(...updateTaskParams);
  closeModal();
};

const getDangerMessage = (oldTime, newTime) => {
  return (
    <span>
      Are you sure you want to change the logged time from
      <span className="confirm-time"> {oldTime} </span>
       to
      <span className="confirm-time"> {newTime} </span>
       ?
    </span>
  );
};

const getTitle = (taskName) => {
  return (
    <h2 className="form-title">
      Confirm time change for task <span className="bold-title">{taskName}</span>
    </h2>
  );
};

function ConfirmEditTask(props) {
  const { closeModal, oldTime, newTime, payload, updateTask, taskName } = props;
  return (
    <Confirm
      onCancel={closeModal}
      onDangerClick={updateTaskAndCloseModal(payload, updateTask, closeModal)}
      dangerText={getDangerMessage(oldTime, newTime)}
      title={getTitle(taskName)}
    />
  );
}

export default connect(null, { closeModal, updateTask, toggleEditTaskModal })(ConfirmEditTask);

ConfirmEditTask.propTypes = {
  closeModal: PropTypes.func.isRequired,
  oldTime: PropTypes.string.isRequired,
  newTime: PropTypes.string.isRequired,
  payload: PropTypes.array.isRequired,
  updateTask: PropTypes.func.isRequired,
  taskName: PropTypes.string.isRequired,
};
