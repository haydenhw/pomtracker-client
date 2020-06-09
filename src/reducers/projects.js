import * as actions from '../actions/indexActions';

const defaultState = {
  activeTaskId: null,
  hasFetched: false,
  isFetching: false,
  items: [],
  queue: null,
  selectedTaskId: localStorage.selectedTaskId || null,
  selectedProjectId: null,
};

function tasks(state, action) {
  switch (action.type) {
    case actions.DELETE_TASK_REQUEST:
      return state.mapAndFindById('clientId', action.projectId, (project) => {
        const deleteIndex = project.tasks.findIndex(task => task.clientId === action.taskId);
        const newTasks = project.tasks.sliceDelete(deleteIndex);

        return Object.assign({}, project, { tasks: newTasks });
      });
    case actions.INCREMENT_TASK_TIME:
      return state.mapAndFindById('clientId', action.projectId, (project) => {
        const newTasks = project.tasks.mapAndFindById('clientId', action.taskId, (task) => {
          return Object.assign({}, task, { recordedTime: task.recordedTime + 1 });
        });

        return Object.assign({}, project, { tasks: newTasks });
      });
    case actions.POST_TASK_SUCCESS:
      return state.mapAndFindById('_id', action.projectDatabaseId, (project) => {
        const newTasks = project.tasks.mapAndFindById('clientId', action.taskClientId, (task) => {
          return Object.assign({}, task, { _id: action.taskDatabaseId });
        });

        return Object.assign({}, project, { tasks: newTasks });
      });
    case actions.UPDATE_TASKS:
      return state.mapAndFindById('clientId', action.projectClientId, (project) => {
        return Object.assign({}, project, { tasks: action.newTasks });
      });

    case actions.UPDATE_TASK_REQUEST:
      return state.mapAndFindById('clientId', action.projectId, (project) => {
        const newTasks = project.tasks.mapAndFindById('clientId', action.taskId, (task) => {
          return Object.assign({}, task, action.toUpdate);
        });
        return Object.assign({}, project, { tasks: newTasks });
      });
    default:
      return state;
  }
}

export default function projects(state = defaultState, action) {
  switch (action.type) {
    case actions.DELETE_PROJECT_REQUEST:
      const projectIndex = state.items.findIndex((project) => {
        return project.clientId === action.project.clientId;
      });

      return {
        ...state,
        items: state.items.sliceDelete(projectIndex),
      };
    case actions.FETCH_PROJECTS_SUCCESS:
      return {
        ...state,
        items: action.projects,
        hasFetched: true,
        isFetching: false,
        selectedProjectId: action.projects.length === 0 ? null : action.projects[0].clientId,
      };
    case actions.POST_PROJECT_REQUEST:
      return {
        ...state,
        selectedProjectId: action.project.clientId,
        items: [
          ...state.items,
          action.project,
        ],
      };
    case actions.POST_PROJECT_SUCCESS:
      return {
        ...state,
        items: state.items.mapAndFindById('clientId', action.clientId, (project) => {
          return Object.assign({}, project, { _id: action.databaseId });
        }),
      };
    case actions.QUEUE_NEW_PROJECT:
      return {
        ...state,
        queue: action.projectName,
      };
    case actions.SET_ACTIVE_TASK:
      return {
        ...state,
        activeTaskId: action.taskId,
      };
    case actions.SET_SELECTED_PROJECT:
      return {
        ...state,
        selectedProjectId: action.projectId,
      };
    case actions.SET_SELECTED_TASK:
      return {
        ...state,
        selectedTaskId: action.taskId,
      };
    case actions.START_RECORDING_TASK:
      return {
        ...state,
        activeTaskId: action.taskId,
        selectedTaskId: action.taskId,
      };
    case actions.STOP_RECORDING_TASKS:
      return {
        ...state,
        activeTaskId: null,
      };
    case actions.SWITCH_RECORDING_TASK:
      return {
        ...state,
        activeTaskId: action.taskId,
        selectedTaskId: action.taskId,
      };
    case actions.TOGGLE_FETCHING:
      return {
        ...state,
        isFetching: !state.isFetching,
      };
    case actions.UPDATE_PROJECT_NAME_REQUEST :
      return {
        ...state,
        items: state.items.mapAndFindById('clientId', action.projectId, (project) => {
          return Object.assign({}, project, { projectName: action.projectName });
        }),
      };
    case actions.DELETE_TASK_REQUEST:
    case actions.INCREMENT_TASK_TIME:
    case actions.POST_TASK_SUCCESS:
    case actions.UPDATE_TASK_REQUEST:
    case actions.UPDATE_TASKS:
      return {
        ...state,
        items: tasks(state.items, action),
      };
    default:
      return state;
  }
}
