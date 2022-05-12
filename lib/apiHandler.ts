import { NextApiRequest, NextApiResponse } from 'next';
import { withSentry } from '@sentry/nextjs';
import { isAuthorised } from '../utils/auth';
import { StatusCodes } from 'http-status-codes';
import { User } from '../types';

export type AuthenticatedNextApiHandler<T = any> = (
  req: NextApiRequest & { user: User },
  res: NextApiResponse<T>
) => void | Promise<void>;

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
