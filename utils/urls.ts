export const getProtocol = (): string =>
  process.env.NODE_ENV === 'production' ? 'https' : 'http';

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

export const parseQueryString = (str: string): Record<string, unknown> =>
  str?.split('&')?.reduce((acc, curr) => {
    const [key, value] = curr.split('=');
    return { ...acc, [key]: value };
  }, {}) || {};
