import { getQueryString } from 'utils/urls';

interface PageData {
  nextCursor?: string;
  [key: string]: unknown;
}

export const getInfiniteKey = (
  baseUrl: string,
  key: string,
  params: Record<string, unknown>
) => (pageIndex: number, previousPageData: PageData): string | null => {
  if (previousPageData && !previousPageData[key]) return null;
  if (pageIndex === 0)
    return `${baseUrl}${params ? `?${getQueryString(params)}` : ''}`;
  return `${baseUrl}?${getQueryString({
    ...params,
    cursor: previousPageData.nextCursor,
  })}`;
};
