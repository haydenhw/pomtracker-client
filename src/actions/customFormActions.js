export const ADD_TEMP_TASK = 'ADD_TEMP_TASK';
export function addTempTask(newTask) {
  return {
   type: ADD_TEMP_TASK,
    newTask,
  };
}

export const REMOTE_SUBMIT = 'REMOTE_SUBMIT';
export function remoteSubmit(formSelector) {
  return {
   type: REMOTE_SUBMIT,
    formSelector,
  };
}

export const SET_TEMP_TASKS = 'SET_TEMP_TASKS';
export function setTempTasks(newTasks) {
  return {
   type: SET_TEMP_TASKS,
    newTasks,
  };
}

export const TOGGLE_SHOULD_DELETE = 'TOGGLE_SHOULD_DELETE';
export function toggleShouldDelete(taskId) {
  return {
   type: TOGGLE_SHOULD_DELETE,
    taskId,
  };
}
