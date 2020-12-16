export const localServerUrl = process.env.REACT_APP_LOCAL_URL || 'http://localhost:5001';
const cloudServerUrl = process.env.REACT_APP_CLOUD_URL || 'https://lula.wtf/ttflask';
const baseUrl = process.env.NODE_ENV === 'production' ? cloudServerUrl : localServerUrl;
export const projectsUrl = `${baseUrl}/api/projects`;
export const tasksUrl = `${baseUrl}/api/tasks`;
export const loginUrl = `${baseUrl}/auth/login`;
export const userUrl = `${baseUrl}/users`;
