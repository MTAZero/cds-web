const isValuable = (value: any) => {
  if (value === null || value === undefined) {
    return false;
  } else {
    return true;
  }
};
const checkEmptyObj = (obj): boolean => {
  let isEmpty = true;
  if (!obj) {
    isEmpty = true;
    return isEmpty;
  }
  if (Object.keys(obj).length === 0) {
    isEmpty = true;
  } else {
    for (var prop in obj) {
      if (obj[prop]) {
        isEmpty = false;
      }
    }
  }
  return isEmpty;
};
export {isValuable, checkEmptyObj};
