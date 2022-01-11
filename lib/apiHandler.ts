import { NextApiRequest, NextApiResponse } from 'next';
import { setUser, withSentry } from '@sentry/nextjs';
import { isAuthorised } from 'utils/auth';
import { StatusCodes } from 'http-status-codes';
import { User } from 'types';

export interface ExtendedNextApiRequest extends NextApiRequest {
  user: User;
}

export const apiHandler =
  (
    handler: (
      req: ExtendedNextApiRequest | NextApiRequest,
      res: NextApiResponse
    ) => void
  ) =>
  async (req: ExtendedNextApiRequest, res: NextApiResponse): Promise<void> => {
    const user = isAuthorised(req);

    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).end();
    }
    if (!user.isAuthorised) {
      return res.status(StatusCodes.FORBIDDEN).end();
    }

    if (req) req.user = user;

    setUser({ email: user.email });
    console.log('LOOK HERE!!!');
    await withSentry(handler)(req, res);
  };
