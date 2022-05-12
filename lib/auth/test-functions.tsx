import { NextApiRequest } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { User } from '../../types';

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
  user?: User;
}

export const makeNextApiRequest = ({
  method = 'GET',
  query = {},
  url = '/',
  body = null,
  headers = {},
  cookies = { [process.env.HACKNEY_AUTH_COOKIE_NAME as string]: 'test-token' },
  user,
}: MakeNextApiRequestInput): NextApiRequest & { user: User } => {
  const request = {
    method,
    url,
    query,
    headers,
    cookies,
    user,
  } as unknown as NextApiRequest & { user: User };

  if (body) request['body'] = JSON.stringify(body);

  return request;
};
