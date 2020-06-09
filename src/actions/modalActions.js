export const ADD_MODAL_CLOSING_CLASS = 'ADD_MODAL_CLOSING_CLASS';
export function addModalClosingClass() {
  return {
   type: ADD_MODAL_CLOSING_CLASS,
  };
}

export const CLOSE_MODAL = 'CLOSE_MODAL';
export function closeModal(callback) {
  return (dispatch, getState) => {
    const delay = getState().modal.isOnboardingActive
      ? 1500
      : 500;

    dispatch(addModalClosingClass());

    setTimeout(() => {
      dispatch({type: CLOSE_MODAL });

      if (callback && (typeof callback === 'function')) {
        callback();
      }
    }, delay);
  };
}

export const CHANGE_MODAL_TYPE = 'CHANGE_MODAL_TYPE';
export function changeModalType(modalType) {
  return {
   type: CHANGE_MODAL_TYPE,
    modalType,
  };
}

export const CONFIRM_EDIT_TASK = 'CONFIRM_EDIT_TASK';
export function confirmEditTask(modalProps) {
  return {
   type: CONFIRM_EDIT_TASK,
    modalProps,
  };
}

export const CONFIRM_DELETE_TASK = 'CONFIRM_DELETE_TASK';
export function confirmDeleteTask(modalProps) {
  return {
   type: CONFIRM_DELETE_TASK,
    modalProps,
  };
}

export const CONFIRM_DELETE_PROJECT = 'CONFIRM_DELETE_PROJECT';
export function confirmDeleteProject(modalProps) {
  return {
   type: CONFIRM_DELETE_PROJECT,
    modalProps,
  };
}

export const TOGGLE_CONFIG = 'TOGGLE_CONFIG';
export function toggleConfig() {
  return {
   type: TOGGLE_CONFIG,
  };
}

export const TOGGLE_ADD_TASKS_MODAL = 'TOGGLE_ADD_TASKS_MODAL';
export function toggleAddTasksModal() {
  return {
   type: TOGGLE_ADD_TASKS_MODAL,
  };
}

export const TOGGLE_EDIT_TASK_MODAL = 'TOGGLE_EDIT_TASK_MODAL';
export function toggleEditTaskModal(taskId) {
  return {
   type: TOGGLE_EDIT_TASK_MODAL,
    taskId,
  };
}

export const TOGGLE_ONBOARD_MODE = 'TOGGLE_ONBOARD_MODE';
export function toggleOnboardMode() {
  return (dispatch, getState) => {
    if (!getState().modal.isOnboardingActive) {
      return dispatch({type: TOGGLE_ONBOARD_MODE });
    }

    dispatch(addModalClosingClass());

    setTimeout(() => dispatch({type: TOGGLE_ONBOARD_MODE }), 1500);
  };
}

export const TOGGLE_PROJECT_NAG_MODAL = 'TOGGLE_PROJECT_NAG_MODAL';
export function toggleProjectNagModal(modalProps) {
  return {
   type: TOGGLE_PROJECT_NAG_MODAL,
    modalProps,
  };
}
