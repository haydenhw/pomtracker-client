export function secondsToMSS(secs) {
  const seconds = Number(secs);

  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 360 % 60);

  return `${m}:${(`0${s}`).slice(-2)}`;
}

export function secondsToHMMSS(secs) {
  const seconds = Number(secs);

  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 3600 % 60);

  return `${h}:${(`0${m}`).slice(-2)}:${(`0${s}`).slice(-2)}`;
}

function hasNaN(array) {
  const nanValueCount = array.filter((element) => { return isNaN(Number(element)); }).length;

  return Boolean(nanValueCount);
}

export function timeStringToSeconds(value, inputFormat) {
  const splitValue = value.split(':');

  if (hasNaN(splitValue)) {
    return 'NAN_ERROR';
  }

  if (splitValue.length === 0) {
    return 0;
  }

  let hours = Number(splitValue[0]);
  let minutes = splitValue.length > 1 ? Number(splitValue[1]) : 0;
  let seconds = splitValue.length > 2 ? Number(splitValue[2]) : 0;

  if (inputFormat === 'MMSS') {
    seconds = minutes;
    minutes = hours;
    hours = 0;
  }


  return (hours * 3600) + (minutes * 60) + seconds;
}
