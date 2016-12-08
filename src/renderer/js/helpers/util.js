
// convert to JSON from an Immutable object or a raw object.
export const toJSON = (obj) => {
  if(obj.toJS) {
    return JSON.stringify(obj.toJS());
  } else {
    return JSON.stringify(obj);
  }
}
