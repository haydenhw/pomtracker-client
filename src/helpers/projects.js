import camelCase from "camel-case";


const transformKeys = (transformer) => (obj) =>
  Object.keys(obj).reduce((c, key) => (c[transformer(key)] = obj[key], c), {});

const underscoreIdKey = (obj) => {
  obj._id = obj.id;
  delete obj.id;
  return obj;
}

const transformProjectKeys = (transformer) => (projects) => {
  return projects.map(p => {
    p = transformer(p);
    p.tasks = p.tasks.map(transformer);
    return p;
  });
}

const camelToSnake = (string) => {
  return string.replace(/[\w]([A-Z])/g, function(m) {
    return m[0] + "_" + m[1];
  }).toLowerCase();
}

const camelizeObject = transformKeys(camelCase);
export const camelizeProjectKeys = transformProjectKeys(camelizeObject);
export const underscoreProjectIds = transformProjectKeys(underscoreIdKey);
export const snakecaseKeys = transformKeys(camelToSnake);

export const removeKey = (obj, propToDelete) => {
  const { [propToDelete]: deleted, ...objectWithoutDeletedProp } = obj;
  return objectWithoutDeletedProp;
};
