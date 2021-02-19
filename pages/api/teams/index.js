import { StatusCodes } from 'http-status-codes';

import { getTeams } from 'utils/server/teams';
import { isAuthorised } from 'utils/auth';

export default async (req, res) => {
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
        const data = await getTeams({
          context_flag: req.query?.ageContext || user.permissionFlag || 'B', //TODO fix this once 'B' has been added to the BE
        });
        res.status(StatusCodes.OK).json(data);
      } catch (error) {
        console.error('Teams get error:', error?.response?.data);
        error?.response?.status === StatusCodes.NOT_FOUND
          ? res
              .status(StatusCodes.NOT_FOUND)
              .json({ message: 'Teams Not Found' })
          : res
              .status(StatusCodes.INTERNAL_SERVER_ERROR)
              .json({ message: 'Unable to get the Teams' });
      }
      break;

    default:
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Invalid request method' });
  }
};
