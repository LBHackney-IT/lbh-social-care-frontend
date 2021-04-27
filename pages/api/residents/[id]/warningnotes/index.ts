import { StatusCodes } from 'http-status-codes';

import { getWarningNotesByResident } from 'lib/warningNotes';
import { isAuthorised } from 'utils/auth';

import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';

const endpoint: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const user = isAuthorised(req);
  if (!user) {
    return res.status(StatusCodes.UNAUTHORIZED).end();
  }
  if (!user.isAuthorised) {
    return res.status(StatusCodes.FORBIDDEN).end();
  }
  switch (req.method) {
    case 'GET':
      try {
        const data = await getWarningNotesByResident(
          parseInt(req.query.id as string, 10)
        );
        res.status(StatusCodes.OK).json(data);
      } catch (error) {
        console.error('Warning Notes get error:', error?.response?.data);
        error?.response?.status === StatusCodes.NOT_FOUND
          ? res.status(StatusCodes.OK).json([]) // this should be fixed BE side
          : res
              .status(StatusCodes.INTERNAL_SERVER_ERROR)
              .json({ message: 'Unable to get the Warning Notes' });
      }
      break;

    default:
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Invalid request method' });
  }
};

export default endpoint;
