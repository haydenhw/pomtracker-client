import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import shortid from 'shortid';
import { SubmissionError, reduxForm } from 'redux-form';

import {
  addTempTask,
  closeModal,
  deleteTask,
  postTask,
  setTempTasks,
  toggleModal,
  toggleOnboardMode,
  toggleShouldDelete,
  updateTasks,
} from '../actions/indexActions';

import { hasAnyValue, isDuplicate } from '../helpers/validate';
import AddTasksForm from '../components/AddTasksForm';


let AddTasksFormContainer = class extends Component {
  constructor(props) {
    super(props);
    this.deleteButtonRefs = {};
  }

  componentDidMount() {
    const {
      showModal,
      isOnboardingActive,
      setTempTasks,
      showTasksForSelectedProject,
      tasks,
    } = this.props;

    if (showTasksForSelectedProject || (!isOnboardingActive && showModal)) {
      setTempTasks(tasks);
    }
  }

  // TODO should this method be made static or defined as a function a the beginning of the file?
  // Or is it fine to leave as is ?
  getContainerClass(containerType, formType) {
    const childContainerClasses = {
      MODAL: 'form-container',
      ONBOARDING: 'form-container onboarding-form',
      FORM_PAGE: '',
    };

    const parentContainerClasses = {
      MODAL: 'bounce-in-down',
      ONBOARDING: 'fullscreen-container'
    }

    if (containerType === 'CHILD') {
      return childContainerClasses[formType];
    }

    if (containerType === 'PARENT') {
      return parentContainerClasses[formType];
    }
  }

  handleAddTask = ({ taskName }) => {
    const { addTempTask, reset, formTasks: tasks } = this.props;

    if (!hasAnyValue(taskName)) {
      return null;
    }

    const taskNames = tasks.map(task => task.taskName);
    if (isDuplicate(taskName, taskNames)) {
      throw new SubmissionError({
        taskName: `A task with the name '${taskName}' already exists`,
      });
    }

    const newTask = {
      taskName,
      key: shortid.generate(),
      recordedTime: 0,
      clientId: shortid.generate(),
      shouldDelete: false,
    };

    addTempTask(newTask);
    reset('taskName');
  }

  handleFormSubmit = () => {
    const {
      closeModal,
      isOnboardingActive,
      updateTasks,
      selectedProject,
      toggleOnboardMode,
      formTasks: tasks,
    } = this.props;

    const tasksToSubmit = tasks.filter(task => !task.shouldDelete);
    if (!tasksToSubmit.length && isOnboardingActive) {
      throw new SubmissionError({
        taskName: 'Please add at least one task',
      });
    }

    updateTasks(selectedProject, tasks);
    isOnboardingActive ? toggleOnboardMode() : closeModal();
  }

  handleDeleteButtonClick = taskId => () => {
    this.props.toggleShouldDelete(taskId);
  }

  handleDeleteButtonMouseOver = taskId => () => {
    this.deleteButtonRefs[taskId].focus();
  }

  handleDeleteButtonMouseOut = taskId => () => {
    this.deleteButtonRefs[taskId].blur();
  }

  renderFormTask = (task) => {
    const { shouldDelete, clientId, taskName } = task;

    return (
      <div className="task-list-item" key={shortid.generate()}>
        <div className="task-list-button-wrapper" >
          <button
            className={`${shouldDelete ? 'task-list-restore' : 'task-list-delete'} circular-delete`}
            ref={(el) => { this.deleteButtonRefs[clientId] = el; }}
            onClick={this.handleDeleteButtonClick(clientId)}
            onMouseOver={this.handleDeleteButtonMouseOver(clientId)}
            onMouseOut={this.handleDeleteButtonMouseOut(clientId)}
          >
            { shouldDelete ? 'Restore' : <div className="icon-close" /> }
          </button>
        </div>
        <div className="task-list-name-wrapper">
          <span>{taskName}</span>
        </div>
      </div>
    );
  }

  render() {
    const { formType, showModal, isOnboardingActive } = this.props;
    return (
      <AddTasksForm
        {...this.props}
        childContainerClass={this.getContainerClass('CHILD', formType)}
        fieldAnimationName={isOnboardingActive ? 'bounce-in-down-second' : ''}
        formAnimationName={isOnboardingActive ? '' : 'bounce-in-down'}
        handleFormSubmit={this.handleFormSubmit}
        handleTaskSubmit={this.handleAddTask}
        parentContainerClass={this.getContainerClass('PARENT', formType)}
        renderFormTask={this.renderFormTask}
        autoFocus={showModal}
        submitButtonClass="fade-in-medium-delay  outline-button modal-button-bottom-right"
        titleAnimationName={isOnboardingActive ? 'bounce-in-down' : ''}
      />
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  const { customForm, modal, projects } = state;
  const { showModal, isOnboardingActive } = modal;
  const { selectedProjectId } = projects;
  const formTasks = customForm.taskForm.tasks;

  const selectedProject = projects.items.find(project => project.clientId === selectedProjectId);
  const selectedProjectDatabaseId = selectedProject && selectedProject._id;

  const tasks = selectedProject && (ownProps.showTasksForSelectedProject !== false)
    ? selectedProject.tasks.map(task => Object.assign(task, { shouldDelete: false }))
    : [];

  return {
    selectedProject,
    selectedProjectId,
    selectedProjectDatabaseId,
    showModal,
    isOnboardingActive,
    tasks,
    formTasks,
  };
};

AddTasksFormContainer = reduxForm({
  form: 'addTasks',
})(AddTasksFormContainer);

export default AddTasksFormContainer = connect(mapStateToProps, {
  addTempTask,
  closeModal,
  deleteTask,
  postTask,
  setTempTasks,
  toggleModal,
  toggleOnboardMode,
  toggleShouldDelete,
  updateTasks,
})(AddTasksFormContainer);

AddTasksFormContainer.propTypes = {
  addTempTask: PropTypes.func,
  closeModal: PropTypes.func,
  formAnimationName: PropTypes.string,
  formTasks: PropTypes.array,
  formType: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func,
  showModal: PropTypes.bool,
  isOnboardingActive: PropTypes.bool,
  reset: PropTypes.func,
  selectedProject: PropTypes.object,
  setTempTasks: PropTypes.func,
  showTasksForSelectedProject: PropTypes.bool,
  tasks: PropTypes.array,
  toggleModal: PropTypes.func,
  toggleOnboardMode: PropTypes.func,
  toggleShouldDelete: PropTypes.func,
  updateTasks: PropTypes.func,
};
