import { timeStringToSeconds } from '../helpers/time';
import { tasksUrl } from '../config/endpointUrls';
import { snakecaseKeys } from '../helpers/projects';

export const DECREMENT_TIMER = 'DECREMENT_TIMER';
export function decrementTimer() {
  return {
    type: DECREMENT_TIMER,
  };
}

export const HANDLE_TIMER_COMPLETE = 'HANDLE_TIMER_COMPLETE';
export const TOGGLE_DESKTOP_NOTIFICATION = 'TOGGLE_DESKTOP_NOTIFICATION';
export function handleTimerComplete() {
  return (dispatch) => {
    dispatch({
      type: HANDLE_TIMER_COMPLETE,
    });

    setTimeout(() => dispatch({
      type: TOGGLE_DESKTOP_NOTIFICATION,
    }), 1500);
  };
}

export const INCREMENT_TASK_TIME = 'INCREMENT_TASK_TIME';
export function incrementTaskTime(project, task) {
  return (dispatch) => {
    const updatedTask = Object.assign({}, task, { recordedTime: task.recordedTime + 1 });

    dispatch({
      type: INCREMENT_TASK_TIME,
      projectId: project.clientId,
      taskId: task.clientId,
    });

    fetch(`${tasksUrl}/${task._id}`, {
      method: 'PATCH',
      body: JSON.stringify(snakecaseKeys(updatedTask)),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  };
}

export const RESET_TIMER = 'RESET_TIMER';
export function resetTimer() {
  return {
    type: RESET_TIMER,
  };
}

export const SET_INTERVAL_ID = 'SET_INTERVAL_ID';
export function setIntervalId(intervalId) {
  return {
    type: SET_INTERVAL_ID,
    intervalId,
  };
}

export const SET_START_TIME = 'SET_START_TIME';
export function setStartTime(startTime, shouldToggleTimer) {
  return (dispatch, getState) => {
    let numericStartTime = isNaN(startTime)
      ? timeStringToSeconds(startTime, 'MMSS')
      : Math.ceil(Number(startTime) * 60);

    numericStartTime = numericStartTime === 'NAN_ERROR'
      ? getState().timer.startTime
      : numericStartTime;

    return dispatch({
      type: SET_START_TIME,
      numericStartTime,
      shouldToggleTimer,
    });
  };
}

export const TOGGLE_TIMER = 'TOGGLE_TIMER';
export function toggleTimer() {
  return {
    type: TOGGLE_TIMER,
  };
}
