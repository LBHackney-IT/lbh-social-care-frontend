import { NextApiRequest } from 'next';
import { ParsedUrlQuery } from 'querystring';

export interface MakeNextApiRequestInput {
  method?:
    | 'GET'
    | 'HEAD'
    | 'POST'
    | 'PUT'
    | 'DELETE'
    | 'CONNECT'
    | 'OPTIONS'
    | 'TRACE'
    | 'PATCH';
  query?: ParsedUrlQuery;
  url?: string;
  body?: unknown;
  headers?: {
    [key: string]: string;
  };
  cookies?: {
    [key: string]: string;
  };
}

export const makeNextApiRequest = ({
  method = 'GET',
  query = {},
  url = '/',
  body = null,
  headers = {},
  cookies = { [process.env.HACKNEY_AUTH_COOKIE_NAME as string]: 'test-token' },
}: MakeNextApiRequestInput): NextApiRequest => {
  const request = {
    method,
    url,
    query,
    headers,
    cookies,
  } as unknown as NextApiRequest;

  if (body) request['body'] = JSON.stringify(body);

  return request;
};
