export const getProtocol = (): string =>
  process.env.NODE_ENV === 'production' ? 'https' : 'http';

/** utility to convert a query string object back into a string, to assist in generating links */
export const getQueryString = (obj: Record<string, unknown>): string =>
  Object.entries(obj).reduce(
    (acc, [key, value]) =>
      value
        ? acc.length > 0
          ? `${acc}&${key}=${value}`
          : `${key}=${value}`
        : acc,
    ''
  );

/** convert a url query string into an object */
export const parseQueryString = (str: string): Record<string, unknown> =>
  str?.split('&')?.reduce((acc, curr) => {
    const [key, value] = curr.split('=');
    return { ...acc, [key]: value };
  }, {}) || {};
