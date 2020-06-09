function isUndefined(value) {
  if (typeof value === 'undefined' || value === undefined) {
    return true;
  }
  return false;
}

export function hasAnyValue(value) {
  if (isUndefined(value) || String(value).trim() === '') {
    return false;
  }
  return true;
}

export function isDuplicate(value, array) {
  if (array.indexOf(value) === -1) {
    return false;
  }
  return true;
}
