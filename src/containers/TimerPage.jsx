import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import shortid from 'shortid';

import {
  deleteTask,
  decrementTimer,
  confirmDeleteTask,
  fetchProjects,
  setSelectedProject,
  setActiveTask,
  setSelectedTask,
  setTempTasks,
  startRecordingTask,
  stopRecordingTasks,
  switchRecordingTask,
  toggleAddTasksModal,
  toggleConfig,
  toggleEditTaskModal,
  toggleOnboardMode,
  toggleTimer,
} from '../actions/indexActions';

import { secondsToHMMSS } from '../helpers/time';

import List from '../components/List';
import Nag from '../components/Nag';
import Timesheet from '../components/Timesheet';
import TimesheetListItem from '../components/TimesheetListItem';
import TotalTime from '../components/TotalTime';
import ContextMenu from './ContextMenu';
import ModalController from './ModalController';
import Select from './Select';
import Timer from './Timer';

import { isDevOnboardingActive } from '../config/devSettings';

const TimerPage = class extends Component {
  static defaultProps = {
    tasks: [],
  }

  constructor(props) {
    super(props);

    this.state = {
      activeContextMenuParentId: null,
    };
  }

  componentWillMount() {
    const {
      history,
      isOnboardingActive,
      projects,
      setSelectedProject,
      setSelectedTask,
      toggleOnboardMode,
    } = this.props;

    if (isDevOnboardingActive && !isOnboardingActive) {
      toggleOnboardMode();
      return null;
    }

    if (
      sessionStorage.isFirstSessionVisit === undefined ||
      (projects.length === 0 && isOnboardingActive)
    ) {
      sessionStorage.isFirstSessionVisit = false;
      toggleOnboardMode();
      return null;
    }

    if (projects.length === 0 && !isOnboardingActive) {
      history.push('/app/projects');
      return null;
    }

    if (
      localStorage.selectedProjectId &&
      projects.find(project => project.clientId === localStorage.selectedProjectId)
    ) {
      setSelectedProject(localStorage.selectedProjectId);
    } else {
      setSelectedProject(projects[projects.length - 1].clientId);
    }

    setSelectedTask(localStorage.prevSelectedTaskId);
  }

  shouldComponentUpdate(nextProps) {
    const { showModal } = this.props;

    if (
      this.props.selectedProjectId &&
      (nextProps.selectedProjectId !== this.props.selectedProjectId) &&
      showModal
    ) {
      return false;
    }

    return true;
  }

  componentDidUpdate(prevProps) {
    const { tasks } = this.props;

    if ((prevProps.tasks.length !== tasks.length) && (tasks.length === 0)) {
      localStorage.setItem('prevSelectedTaskId', null);

      setSelectedTask(null);
    }
  }

  setActiveContextMenu = activeContextMenuParentId => () => {
    this.setState({ activeContextMenuParentId });
  }

  // TODO consider alternatives to using closures like this
  handleEditTask = taskId => () => {
    const { toggleEditTaskModal } = this.props;
    toggleEditTaskModal(taskId);
  }

  handlePlayClick = taskId => (evt) => {
    const {
      isTimerActive,
      activeTaskId,
      startRecordingTask,
      stopRecordingTasks,
      switchRecordingTask,
    } = this.props;

    evt.stopPropagation();

    if (isTimerActive && (activeTaskId === taskId)) {
      stopRecordingTasks();
    } else if (isTimerActive && !(activeTaskId === taskId)) {
      switchRecordingTask(taskId);
    } else {
      startRecordingTask(taskId);
    }
  }

  handleTaskChange = (taskId) => {
    const { isTimerActive, setSelectedTask, switchRecordingTask } = this.props;

    if (localStorage.prevSelectedTaskId !== taskId) {
      localStorage.setItem('prevSelectedTaskId', taskId);
    }

    if (isTimerActive) {
      switchRecordingTask(taskId);
    } else {
      setSelectedTask(taskId);
    }
  }

  handleTaskDelete = (selectedProject, task) => () => {
    const { confirmDeleteTask } = this.props;

    confirmDeleteTask({
      payload: [selectedProject, task, true],
      taskName: task.taskName,
    });
  }

  handleTaskItemClick = taskId => () => {
    this.handleTaskChange(taskId);
  }

  renderTask = (task) => {
    const {
      activeTaskId,
      isTimerActive,
      selectedProject,
      selectedTaskId,
    } = this.props;

    const { clientId, taskName, recordedTime } = task;

    return (
      <TimesheetListItem
        actionIconClass="play"
        key={shortid.generate()}
        handleItemClick={this.handleTaskItemClick(clientId)}
        handlePlayClick={this.handlePlayClick(clientId)}
        isActive={(activeTaskId === clientId) && isTimerActive}
        isSelected={selectedTaskId === clientId}
        title={taskName}
        time={recordedTime}

      >
        {/* TODO do we have to pass this in as a child */}
        <ContextMenu
          className="list-item-context-menu"
          parentId={clientId}
        >
          <li className="popup-menu-item" onClick={this.handleEditTask(clientId)} role="menuitem">
            <i className="context-menu-icon icon-edit" />
            <a className="popup-menu-item-name">Edit</a>
          </li>
          <li
            className="popup-menu-item"
            onClick={this.handleTaskDelete(selectedProject, task)}
            role="menuitem"
          >
            <i className="context-menu-icon icon-delete" />
            <a className="popup-menu-item-name">Delete</a>
          </li>
        </ContextMenu>
      </TimesheetListItem>
    );
  }

  renderTaskSelect() {
    const { selectedTaskId, tasks } = this.props;

    const simplifiedTasks = tasks.map((task) => {
      return {
        name: task.taskName,
        id: task.clientId,
      };
    });

    const selectedTask = tasks.find(task => task.clientId === selectedTaskId);
    const selectedTaskName = selectedTask && selectedTask.taskName;
    const taskSelectHeading = selectedTaskName || 'Click to select a task...';
    const headingClass = selectedTaskName ? '' : 'grey';

    return (
      <Select
        className="task-select"
        onChange={this.handleTaskChange}
        items={simplifiedTasks}
      >
        <span className={headingClass}>{taskSelectHeading}</span>
      </Select>
    );
  }

  render() {
    const {
      activeTaskId,
      hasFetched,
      isModalClosing,
      isOnboardingActive,
      selectedProject,
      selectedTaskId,
      tasks,
      toggleAddTasksModal,
    } = this.props;

    // TODO move this calculation to mapProps and inject as a prop
    const totalTime = tasks.length
      ? tasks.map(task => Number(task.recordedTime)).reduce((a, b) => a + b)
      : 0;
    const selectedProjectName = selectedProject ? selectedProject.projectName : '';

    if (!hasFetched) {
      return <div className="loader">Loading...</div>;
    }

    return (
      <div>
        {/* TODO accessibility tags? */}
        <section className="timer-section">
          <div className="timer-container">
            {tasks.length > 0 && this.renderTaskSelect()}
            <Timer
              activeTaskId={activeTaskId}
              tasks={tasks}
              selectedTaskId={selectedTaskId}
              setActiveTask={setActiveTask}
            />
          </div>
        </section>
        {tasks.length > 0
          ? <section className="timesheet-section">
            <Timesheet
              buttonText="NEW TASKS"
              // TODO what type of button?
              onNewEntityButtonClick={toggleAddTasksModal}
              titleText={
                <span>
                  Tasks for project
                  <span className={'bold-title'} key={shortid.generate()}>
                    {` ${selectedProject.projectName}`}
                  </span>
                </span>
              }
            >
              <List className="timesheet-list list" items={tasks} renderItem={this.renderTask} />
              <TotalTime time={secondsToHMMSS(totalTime)} />
            </Timesheet>
          </section>
          : <Nag
            actionButtonText="ADD TASKS"
            nagMessage={
              <span>Add tasks to project
                <span className="bold-title">
                  {` ${selectedProjectName}`}
                </span> to start tracking time.
              </span>
            }
            onActionButtonClick={toggleAddTasksModal}
          />
        }
        <ModalController
          // TODO move these classes to the render method
          modalClass={`${isOnboardingActive ? 'fullscreen-modal' : 'normal-modal'}`}
          rootModalClass={
            `${isOnboardingActive ? 'unfold' : 'roadrunner'} ${isModalClosing ? 'out' : ''}`
          }
        />
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  const { modal, projects, timer } = state;
  const { activeTaskId, hasFetched, isFetching, selectedProjectId, selectedTaskId } = projects;
  const { showModal, isModalClosing, isOnboardingActive } = modal;
  const { isTimerActive } = timer;

  const selectedProject = projects.items.find(project => project.clientId === selectedProjectId);
  const selectedTasks = selectedProject && selectedProject.tasks;

  return {
    activeTaskId,
    hasFetched,
    isFetching,
    showModal,
    isModalClosing,
    isOnboardingActive,
    isTimerActive,
    selectedProject,
    selectedTaskId,
    selectedTasks,
    projects: projects.items,
    tasks: selectedTasks,
  };
};

export default connect(mapStateToProps, {
  confirmDeleteTask,
  decrementTimer,
  deleteTask,
  fetchProjects,
  setSelectedProject,
  setActiveTask,
  setSelectedTask,
  setTempTasks,
  startRecordingTask,
  stopRecordingTasks,
  switchRecordingTask,
  toggleAddTasksModal,
  toggleConfig,
  toggleEditTaskModal,
  toggleOnboardMode,
  toggleTimer,
})(withRouter(TimerPage));

TimerPage.propTypes = {
  activeTaskId: PropTypes.string,
  confirmDeleteTask: PropTypes.func.isRequired,
  hasFetched: PropTypes.bool,
  showModal: PropTypes.bool,
  history: PropTypes.object.isRequired,
  isModalClosing: PropTypes.bool,
  isOnboardingActive: PropTypes.bool,
  isTimerActive: PropTypes.bool,
  projects: PropTypes.array,
  selectedProject: PropTypes.object,
  selectedProjectId: PropTypes.string,
  selectedTaskId: PropTypes.string,
  setSelectedProject: PropTypes.func.isRequired,
  setSelectedTask: PropTypes.func.isRequired,
  startRecordingTask: PropTypes.func.isRequired,
  stopRecordingTasks: PropTypes.func.isRequired,
  switchRecordingTask: PropTypes.func.isRequired,
  tasks: PropTypes.array,
  toggleAddTasksModal: PropTypes.func.isRequired,
  toggleEditTaskModal: PropTypes.func.isRequired,
  toggleOnboardMode: PropTypes.func.isRequired,
};
