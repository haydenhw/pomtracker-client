Array.prototype.concatMap = function (callback) {
  const newArray = [];

  this.map(callback).forEach((element) => {
    element.forEach((element) => {
      newArray.push(element);
    });
  });

  return newArray;
};

Array.prototype.mapAndFindById = function (idKey, id, callback) {
  return this.map((element, index) => {
    if (element[idKey] === id) {
      return callback(element, index);
    }

    return element;
  });
};

Array.prototype.sliceDelete = function (index) {
  return [
    ...this.slice(0, index),
    ...this.slice(index + 1),
  ];
};
