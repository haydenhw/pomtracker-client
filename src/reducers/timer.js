import * as actions from '../actions/indexActions';

const defaultState = {
  intervalId: null,
  isTimerActive: false,
  isDesktopNotificationActive: false,
  remainingTime: null,
  startTime: 25 * 60,
};

export default function timer(state = defaultState, action) {
  switch (action.type) {
    case actions.DECREMENT_TIMER:
      return {
        ...state,
        remainingTime: state.remainingTime - 1,
      };
    case actions.HANDLE_TIMER_COMPLETE:
      return {
        ...state,
        isDesktopNotificationActive: !state.isDesktopNotificationActive,
        isTimerActive: !state.isTimerActive,
        remainingTime: state.startTime,
      };
    case actions.RESET_TIMER:
      return {
        ...state,
        remainingTime: state.startTime,
      };
    case actions.SET_INTERVAL_ID:
      return {
        ...state,
        intervalId: action.intervalId,
      };
    case actions.SET_START_TIME:
      return {
        ...state,
        isTimerActive: action.shouldToggleTimer ? !state.isTimerActive : state.isTimerActive,
        startTime: action.startTime,
        remainingTime: action.startTime,

      };
    case actions.START_RECORDING_TASK:
      return {
        ...state,
        isTimerActive: true,
        remainingTime: state.startTime,
      };
    case actions.STOP_RECORDING_TASKS:
    case actions.DELETE_TASK_REQUEST:
      return {
        ...state,
        isTimerActive: false,
        remainingTime: state.startTime,
      };
    case actions.TOGGLE_DESKTOP_NOTIFICATION:
      return {
        ...state,
        isDesktopNotificationActive: !state.isDesktopNotificationActive,
      };
    case actions.TOGGLE_TIMER:
      return {
        ...state,
        isTimerActive: !state.isTimerActive,
        remainingTime: state.startTime,
      };
    default:
      return state;
  }
}
