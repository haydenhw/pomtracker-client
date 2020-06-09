import jwtDecode from 'jwt-decode';
import shortid from 'shortid';

let id = 1;
// TODO change this back to something functional after adding users
export const getUser = () => ({ _id: id++, username: 'fdsa' + id }) //JSON.parse(localStorage.getItem('pomtrackerDemoUser'));
export const getJWT= () => localStorage.getItem('pomtrackerJWT');
export const setUser = user => localStorage.setItem('pomtrackerDemoUser', JSON.stringify(user));
export const setJWT = jwt => localStorage.setItem('pomtrackerJWT', jwt);
export const clearUser = () => localStorage.removeItem('pomtrackerDemoUser');
export const clearJWT = () => localStorage.removeItem('pomtrackerJWT');
export const doesUserExist = () => Boolean(getUser());

export const createNewUser = () => {
  const id = shortid.generate();
  localStorage.setItem('userId', id);
  return id;
}

export const getUserId = () => {
  return localStorage.getItem('userId')
}

export const isJWTExpired = jwt => {
  const jwtExp = jwtDecode(jwt).exp;
  const now = new Date() / 1000;

  return now > jwtExp;
};

export const getJWTAuthHeader = jwt => ({
  'Authorization': 'Bearer ' + jwt,
});
