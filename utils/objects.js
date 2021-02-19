import merge from 'deepmerge';

const combineMerge = (target, source, options) => {
  const destination = target.slice();
  source.forEach((item, index) => {
    if (typeof destination[index] === 'undefined') {
      destination[index] = options.cloneUnlessOtherwiseSpecified(item, options);
    } else if (options.isMergeableObject(item)) {
      destination[index] = merge(target[index], item, options);
    } else if (target.indexOf(item) === -1) {
      destination.push(item);
    }
  });
  return destination;
};

export const deepmerge = (obj1, obj2) =>
  merge(obj1, obj2, {
    arrayMerge: combineMerge,
  });

const sanitise = (result, value, key) => {
  // Exclude empty strings, null, undefined.
  if (!value && value !== false) {
    return result;
  }

  // Recurse into arrays and objects.
  if (
    Array.isArray(value) ||
    Object.values(value).some((v) => typeof v === 'object')
  ) {
    value = sanitiseObject(value);
  }

  // Exclude empty objects.
  if (typeof value === 'object' && !Object.values(value).some(Boolean)) {
    return result;
  }

  // Exclude empty arrays.
  if (Array.isArray(value) && !value.length) {
    return result;
  }

  return Array.isArray(result)
    ? [...result, value]
    : { ...result, [key]: value };
};

export const sanitiseObject = (object) =>
  Array.isArray(object)
    ? object.reduce((acc, value) => sanitise(acc, value), [])
    : Object.entries(object).reduce(
        (acc, [key, value]) => sanitise(acc, value, key),
        {}
      );

export const setValues = (object, value) =>
  Object.keys(object).reduce((acc, key) => ({ ...acc, [key]: value }), {});
