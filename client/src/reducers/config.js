import * as actions from '../actions/indexActions';

const defaultState = {
  alarmSoundSrc: 'sound/Old-clock-ringing-short.mp3',
};

export function config(state = defaultState, action) {
  switch (action.type) {
    case actions.UPDATE_CONFIG:
      return action.newConfigData;
    default:
      return state;
  }
}
