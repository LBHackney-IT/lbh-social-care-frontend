import { getQueryString } from 'utils/urls';

export const getInfiniteKey = (baseUrl, key, params) => (
  pageIndex,
  previousPageData
) => {
  if (previousPageData && !previousPageData[key]) return null;
  if (pageIndex === 0)
    return `${baseUrl}${params ? `?${getQueryString(params)}` : ''}`;
  return `${baseUrl}?${getQueryString({
    ...params,
    cursor: previousPageData.nextCursor,
  })}`;
};
