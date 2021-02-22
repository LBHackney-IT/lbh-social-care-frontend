import { StatusCodes } from 'http-status-codes';

import { isAuthorised } from 'utils/auth';

import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';

const endpoint: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  switch (req.method) {
    case 'GET':
      try {
        const auth = isAuthorised(req);
        !auth
          ? res.status(StatusCodes.UNAUTHORIZED).end()
          : auth.isAuthorised
          ? res.status(StatusCodes.OK).json(auth)
          : res.status(StatusCodes.FORBIDDEN).end();
      } catch (e) {
        console.error(e);
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: 'Unable to get the Cases' });
      }
      break;

    default:
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Invalid request method' });
  }
};

export default endpoint;
