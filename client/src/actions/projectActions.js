export const ADD_TASK = "ADD_TASK";
export function addTask(projectId, taskName) {
  return {
    type: ADD_TASK,
    projectId,
    taskName
  }
}

export const DELETE_TASK = "DELETE_TASK";
export function deleteTask(projectId, taskId) {
  return {
    type: DELETE_TASK,
    projectId,
    taskId
  }
}

export const CHANGE_SELECTED_PROJECT = "CHANGE_SELECTED_PROJECT";
export function changeSelectedProject(projectId) {
  return {
    type: CHANGE_SELECTED_PROJECT,
    projectId,
  }
}