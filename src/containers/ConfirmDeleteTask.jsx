import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { closeModal, deleteTask } from '../actions/indexActions';
import Confirm from '../components/Confirm';

const deleteTaskAndCloseModal = (deleteTaskParams, deleteTask, closeModal) => () => {
  deleteTask(...deleteTaskParams);
  closeModal();
};

const renderDangerText = (taskName) => {
  return (
    <span>
      Are you sure you want to delete task <span className="bold-title">{taskName}</span> ?
    </span>
  );
};

function ConfirmDeleteTask(props) {
  const { closeModal, deleteTask, payload, taskName } = props;

  return (
    <Confirm
      onDangerClick={deleteTaskAndCloseModal(payload, deleteTask, closeModal)}
      dangerText={renderDangerText(taskName)}
      onCancel={closeModal}
      title={<h2>Confirm Delete</h2>}
    />
  );
}

export default connect(null, { closeModal, deleteTask })(ConfirmDeleteTask);

ConfirmDeleteTask.propTypes = {
  closeModal: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  payload: PropTypes.array.isRequired,
  taskName: PropTypes.string.isRequired,
};
