import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';

import { closeModal, confirmEditTask, updateTask } from '../actions/indexActions';
import { secondsToHMMSS, timeStringToSeconds } from '../helpers/time';
import { hasAnyValue, isDuplicate } from '../helpers/validate';

import EditTaskForm from '../components/EditTaskForm';

let EditTaskModal = class extends Component {
  handleEditTaskSubmit = ({ taskName, newTime }) => {
    const {
      closeModal,
      confirmEditTask,
      initialValues,
      selectedProject,
      selectedTask,
      taskNames,
      updateTask,
    } = this.props;

    const newTimeString = timeStringToSeconds(newTime);

    if (taskName !== initialValues.taskName && isDuplicate(taskName, taskNames)) {
      throw new SubmissionError({
        taskName: `A task with the name ${taskName} already exits`,
      });
    }

    if (!hasAnyValue(taskName)) {
      throw new SubmissionError({
        taskName: 'This field cannot be left blank',
      });
    }

    if (isNaN(newTimeString)) {
      throw new SubmissionError({
        newTime: 'Please enter a numberic time',
      });
    }

    const toUpdate = {
      taskName,
      recordedTime: newTimeString,
    };

    if (secondsToHMMSS(newTimeString) !== initialValues.newTime) {
      confirmEditTask({
        taskName,
        payload: [selectedProject, selectedTask, toUpdate],
        oldTime: initialValues.newTime,
        newTime: secondsToHMMSS(newTimeString),
      });
    } else if (taskName !== initialValues.taskName) {
      updateTask(selectedProject, selectedTask, toUpdate);
      closeModal();
    } else {
      closeModal();
    }
  }
  render() {
    const { initialValues } = this.props;

    return (
      <EditTaskForm
        containerClass="normal-modal-form-container"
        handleEditTaskSubmit={this.handleEditTaskSubmit}
        initialValues={initialValues}
      />
    );
  }
};

const mapStateToProps = (state) => {
  const { editMenu, projects } = state;
  const { clickedTaskId } = editMenu;
  const { selectedProjectId } = projects;

  const selectedProject = projects.items.find(project => project.clientId === selectedProjectId);

  const selectedTask = projects.items.concatMap(project => project.tasks)
    .find(task => clickedTaskId === task.clientId);

  const taskNames = selectedProject.tasks.map(task => task.taskName);

  return ({
    clickedTaskId,
    selectedProjectId,
    selectedProject,
    selectedTask,
    taskNames,
    initialValues: {
      taskName: selectedTask.taskName,
      newTime: secondsToHMMSS(selectedTask.recordedTime),
    },
  });
};

EditTaskModal = connect(mapStateToProps, {
  closeModal,
  confirmEditTask,
  updateTask,
})(EditTaskModal);

export default EditTaskModal;

EditTaskModal.propTypes = {
  closeModal: PropTypes.func,
  confirmEditTask: PropTypes.func,
  initialValues: PropTypes.object,
  selectedProject: PropTypes.object,
  selectedTask: PropTypes.object,
  taskNames: PropTypes.array,
  updateTask: PropTypes.string,
};
