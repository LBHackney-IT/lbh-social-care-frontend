import { sign } from 'jsonwebtoken';
import { NextApiRequest } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { ServerResponse } from 'http';

export const dateToUnix = (date: Date): number =>
  Math.floor(date.getTime() / 1000);

interface MakeTokenInput {
  sub?: string;
  email?: string;
  iss?: string;
  name?: string;
  groups?: Array<string>;
  iat?: Date;
}

export const makeToken = ({
  sub = '49516349857314',
  email = 'test@example.com',
  iss = 'Hackney',
  name = 'example user',
  groups = ['test-group'],
  iat = new Date(),
}: MakeTokenInput): string =>
  sign(
    { sub, email, iss, name, groups, iat: dateToUnix(iat) },
    process.env.HACKNEY_AUTH_TOKEN_SECRET as string
  );

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

export interface MakeGetServerSidePropsContextInput {
  resolvedUrl?: string;
  method?: string;
  token?: string;
  query?: ParsedUrlQuery;
  referer?: string;
  res?: ServerResponse;
}

export type HttpMethod =
  | 'GET'
  | 'HEAD'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'CONNECT'
  | 'OPTIONS'
  | 'TRACE'
  | 'PATCH';
