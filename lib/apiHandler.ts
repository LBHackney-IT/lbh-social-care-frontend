import { NextApiRequest, NextApiResponse } from 'next';
import { withSentry } from '@sentry/nextjs';
import { isAuthorised } from '../utils/auth';
import { StatusCodes } from 'http-status-codes';
import { AxiosError } from 'axios';
import { User } from '../types';

export type AuthenticatedNextApiHandler<T = any> = (
  req: NextApiRequest & { user: User },
  res: NextApiResponse<T>
) => void | Promise<void>;

export const handleAxiosError = (
  res: NextApiResponse,
  error: AxiosError,
  objectName: string
) => {
  switch (error.response?.status) {
    case StatusCodes.NOT_FOUND:
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: `${objectName} Not Found` });
      break;
    case StatusCodes.INTERNAL_SERVER_ERROR:
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: `Internal server error: Unable to get ${objectName}`,
      });
      break;
    default:
      res.status(error.response?.status || 500).json(error?.response?.data);
      break;
  }
  return res;
};

export const apiHandler =
  (handler: AuthenticatedNextApiHandler) =>
  async (
    req: NextApiRequest & { user: User },
    res: NextApiResponse
  ): Promise<void> => {
    const user = isAuthorised(req);

    if (!user) {
      res.status(StatusCodes.UNAUTHORIZED);
      return;
    }
    if (!user.isAuthorised) {
      res.status(StatusCodes.FORBIDDEN);
      return;
    }

    req.user = user;

    await (
      withSentry(
        handler as (
          req: NextApiRequest,
          res: NextApiResponse
        ) => void | Promise<void>
      ) as (
        req: NextApiRequest & { user: User },
        res: NextApiResponse
      ) => Promise<void>
    )(req, res);
  };
