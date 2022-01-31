import { apiHandler } from './apiHandler';
import { NextApiRequest, NextApiResponse } from 'next';

jest.mock('utils/auth');
const mockHandler = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(() => {
  return {
    json: mockJson,
  };
});
const mockRes = {
  status: mockStatus,
};

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
  query?: string;
  url?: string;
  // session?: UserSession | null;
  body?: unknown;
  headers?: {
    [key: string]: string;
  };
}

export const makeNextApiRequest = ({
  method = 'GET',
  query = '',
  url = '/',
  // session = null,
  body = null,
  headers = {},
}: MakeNextApiRequestInput): NextApiRequest => {
  const request = {
    method,
    url,
    query,
    headers,
  } as unknown as NextApiRequest;

  // if (session) request['user'] = session;
  if (body) request['body'] = JSON.stringify(body);

  return request;
};

describe('apihandler', () => {
  ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].forEach((method) => {
    it(`calls the endpoint handler if HTTP method is ${method}`, async () => {
      await apiHandler(mockHandler)(
        makeNextApiRequest({ method: method as HttpMethod }),
        mockRes as unknown as NextApiResponse
      );

      expect(mockHandler).toBeCalled();
    });
  });

  it('throws errors from endpoint handler', async () => {
    const mockErrorHandler = jest
      .fn()
      .mockRejectedValue(new Error('example error'));

    await expect(
      apiHandler(mockErrorHandler)(
        makeNextApiRequest({}),
        mockRes as unknown as NextApiResponse
      )
    ).rejects.toEqual(new Error('example error'));

    expect(mockErrorHandler).toBeCalled();
  });
});

// a test for isAuth?
// a test for undefined
// a test for type
// a test for the throws errors page?
