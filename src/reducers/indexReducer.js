import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import config from './config';
import customForm from './customForm';
import editMenu from './editMenu';
import modal from './modal';
import projects from './projects';
import timer from './timer';

export default combineReducers({
  config,
  customForm,
  editMenu,
  modal,
  projects,
  timer,
  form: formReducer,
});
