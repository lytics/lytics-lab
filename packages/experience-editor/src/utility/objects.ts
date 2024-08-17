export const removeEmptyObjects = (object: any) => {
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      const value = object[key];
      if (value && typeof value === "object") {
        removeEmptyObjects(value);
      }
      if (
        (value && typeof value === "object" && !Object.keys(value).length) ||
        value === null ||
        value === undefined
      ) {
        if (Array.isArray(object)) {
          object.splice(Number(key), 1);
        } else {
          delete object[key];
        }
      }
    }
  }
  return object;
};

export const getValueByDotNotation = (obj, path) => {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
};
