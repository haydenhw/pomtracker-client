import shortid from 'shortid';

export const ADD_PROJECT = "ADD_PROJECT";
export function addProject(projectName) {
  const newProject = {
    projectName,
    tasks: [],
    shortId: shortid.generate()
  }
  
  return {
    type: "ADD_PROJECT",
    project: newProject
  }
}

export const UPDATE_TASKS = "UPDATE_TASKS";
export function updateTasks(projectId, newTasks) {
  return {
    type: "UPDATE_TASKS",
    projectId,
    newTasks
  }
}

export const SET_ACTIVE_PROJECT = "SET_ACTIVE_PROJECT";
export function setActiveProject(projectId) {
  return {
    type: "SET_ACTIVE_PROJECT",
    projectId
  }
}

export const DELETE_TASK_REQUEST = "DELETE_TASK_REQUEST";
export function deleteTaskRequest(projectId, taskId) {
  return {
    type: 'DELETE_TASK_REQUEST',
    projectId,
    taskId
  }
}

export const POST_PROJECT_REQUEST = 'POST_PROJECT_REQUEST'; 
export function postProjectRequest(project) {
  return {
    type: 'POST_PROJECT_REQUEST',
    project
  }
}

export const POST_PROJECT_SUCCESS = 'POST_PROJECT_SUCCESS'; 
export function postProjectSuccess(projectId, databaseId) {
  return {
    type: 'POST_PROJECT_SUCCESS',
    projectId,
    databaseId
  }
}

export const POST_TASK_SUCCESS = 'POST_TASK_SUCCESS'; 
export function postTaskSuccess(projectId, taskId, databaseId) {
  return {
    type: 'POST_TASK_SUCCESS',
    projectId,
    taskId,
    databaseId
  }
}


export const FETCH_PROJECTS_SUCCESS = 'FETCH_PROJECTS_SUCCESS'; 
export const fetchProjectsSuccess = (projects) => ({
  type: 'FETCH_PROJECTS_SUCCESS',
  projects
});

export function fetchProjects() {
  return (dispatch) => {
    fetch('projects')
    .then((res) => {
      return res.json();
    })
    .then(data => {
      dispatch(fetchProjectsSuccess(data.projects));
    })
  }
}

export function postProject(projectName) {
  
  return (dispatch) => {
    const newProject = {
      projectName,
      shortId: shortid.generate(),
      tasks: []
    }
    
    dispatch(postProjectRequest(newProject));
    
    fetch(
      'projects',
      {
          method: "POST",
          body: JSON.stringify(newProject),
          headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        })
      })
      .then((res) => {
        return res.json();
      })
      .then(data => {
        const projectId = data.shortId;
        const databaseId = data._id;
        
        dispatch(postProjectSuccess(projectId, databaseId))
      })
      .catch(err => {
        console.error(err)
      })
  }
}

export function postTask(projectId, task) {
  return (dispatch) => {
    fetch(
      `projects/${projectId}`,
      {
          method: "POST",
          body: JSON.stringify(task),
          headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        })
      })
      .then((res) => {
        return res.json();
      })
      .then(data => {
        const taskId = data.shortId;
        const databaseId = data._id;
        
        dispatch(postTaskSuccess(projectId, taskId, databaseId));
      })
      .catch(err => {
        console.error(err)
      })
  }
}

export const DELETE_PROJECT_REQUEST= 'DELETE_PROJECT_REQUEST';
export function deleteProject(project) {
  return (dispatch) => {
    console.log('delete requested')
    dispatch({
      type: 'DELETE_PROJECT_REQUEST',
      project
    })
    
    console.log('delete requested')
    fetch(
      `projects/${project._id}`,
      {
          method: "DELETE",
          headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        })
      })
      .then((res) => {
        console.log('delete successful')
        
      })
      .catch(err => {
        console.error(err)
      })
  }
}

export function deleteTask(projectId, taskId) {
  const url = `projects/${projectId}/${taskId}`;
  return (dispatch) => {
    console.log('delete requested')
    fetch(
      url,
      {
          method: "DELETE",
          headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        })
      })
      .then((res) => {
        console.log('delete successful')
        
      })
      .catch(err => {
        console.error(err)
      })
  }
}