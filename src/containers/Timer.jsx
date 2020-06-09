import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  decrementTimer,
  handleTimerComplete,
  incrementTaskTime,
  resetTimer,
  setIntervalId,
  setStartTime,
  startRecordingTask,
  stopRecordingTasks,
  toggleTimer,
} from '../actions/indexActions';

import TimeDisplay from '../components/TimeDisplay';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCount: props.startCount,
      intervalId: null,
    };
  }

  componentWillMount() {
    const { intervalId, isTimerActive } = this.props;

    if (isTimerActive === false) {
      clearInterval(intervalId);
    }
  }

  componentWillReceiveProps(nextProps) {
    if ((this.props.isTimerActive !== nextProps.isTimerActive) && nextProps.isTimerActive) {
      const { selectedTaskId, setActiveTask, setIntervalId } = this.props;
      const intervalId = setInterval(this.timer, 1000);

      setIntervalId(intervalId);

      // setActiveTask(selectedTaskId);
    }

    if ((this.props.isTimerActive !== nextProps.isTimerActive) && !nextProps.isTimerActive) {
      const { intervalId } = this.props;

      clearInterval(intervalId);
    }
  }

  doesSelectedTaskExist() {
    const { selectedTaskId, tasks } = this.props;
    const taskIds = tasks.map(task => task.clientId);

    return taskIds.includes(selectedTaskId);
  }

  timer = () => {
    const {
      alarmSoundSrc,
      decrementTimer,
      handleTimerComplete,
      incrementTaskTime,
      remainingTime,
      selectedProject,
      selectedTaskId,
      setActiveTask,
    } = this.props;

    const { intervalId } = this.props;
    const activeTask = selectedProject.tasks.find(task => task.clientId === selectedTaskId);

    incrementTaskTime(selectedProject, activeTask);
    decrementTimer();

    if (remainingTime < 1) {
      const audio = new Audio(alarmSoundSrc);
      audio.play();

      clearInterval(intervalId);
      handleTimerComplete();
      setActiveTask(null);
    }
  }

  handlePlayClick = selectedTaskId => () => {
    this.props.startRecordingTask(selectedTaskId);
  }

  handleSetStartTime = selectedTaskId => (newTime) => {
    const { selectedTaskId, setStartTime } = this.props;
    const shouldToggleTimer = Boolean(selectedTaskId);

    setStartTime(newTime, shouldToggleTimer);
  }

  render() {
    const {
      isTimerActive,
      remainingTime,
      startTime,
      selectedTaskId,
      stopRecordingTasks,
    } = this.props;

    return (
      <div>
        <TimeDisplay
          isTimerActive={isTimerActive}
          isTimerControlActive={this.doesSelectedTaskExist()}
          setStartTime={this.handleSetStartTime(selectedTaskId)}
          startCount={startTime}
          time={remainingTime}
          handlePlayClick={this.handlePlayClick(selectedTaskId)}
          handleStopClick={stopRecordingTasks}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { config, projects, timer } = state;
  const { selectedProjectId } = projects;
  const { alarmSoundSrc } = config;
  const { intervalId, isTimerActive, remainingTime, startTime } = timer;
  const selectedProject = projects.items.find(project => project.clientId === selectedProjectId);

  return {
    alarmSoundSrc,
    intervalId,
    isTimerActive,
    remainingTime,
    selectedProject,
    startTime,
    projects: projects.items,
  };
};

export default connect(mapStateToProps, {
  decrementTimer,
  handleTimerComplete,
  incrementTaskTime,
  resetTimer,
  startRecordingTask,
  stopRecordingTasks,
  setIntervalId,
  setStartTime,
  toggleTimer,
})(Timer);

Timer.propTypes = {
  alarmSoundSrc: PropTypes.string.isRequired,
  decrementTimer: PropTypes.func.isRequired,
  handleTimerComplete: PropTypes.func.isRequired,
  incrementTaskTime: PropTypes.func.isRequired,
  intervalId: PropTypes.number,
  isTimerActive: PropTypes.bool,
  remainingTime: PropTypes.number,
  selectedProject: PropTypes.object,
  selectedTaskId: PropTypes.string,
  setActiveTask: PropTypes.func.isRequired,
  setIntervalId: PropTypes.func.isRequired,
  setStartTime: PropTypes.func.isRequired,
  startCount: PropTypes.number,
  startRecordingTask: PropTypes.func.isRequired,
  stopRecordingTasks: PropTypes.func.isRequired,
  startTime: PropTypes.number.isRequired,
  tasks: PropTypes.array.isRequired,
};
