import * as HttpStatus from 'http-status-codes';

import { useTeams } from 'utils/server/teams';
import { isAuthorised } from 'utils/auth';

export default async (req, res) => {
  const user = isAuthorised(req);
  if (!user) {
    return res.status(HttpStatus.UNAUTHORIZED).end();
  }
  if (!user.isAuthorised) {
    return res.status(HttpStatus.FORBIDDEN).end();
  }
  switch (req.method) {
    case 'GET':
      try {
        const data = await useTeams({
          context_flag: req.query?.ageContext || user.permissionFlag || 'B', //TODO fix this once 'B' has been added to the BE
        });
        res.status(HttpStatus.OK).json(data);
      } catch (error) {
        console.error('Teams get error:', error?.response?.data);
        error?.response?.status === HttpStatus.NOT_FOUND
          ? res
              .status(HttpStatus.NOT_FOUND)
              .json({ message: 'Teams Not Found' })
          : res
              .status(HttpStatus.INTERNAL_SERVER_ERROR)
              .json({ message: 'Unable to get the Teams' });
      }
      break;

    default:
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Invalid request method' });
  }
};
