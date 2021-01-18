import * as HttpStatus from 'http-status-codes';

import { getResident } from 'utils/server/residents';
import { isAuthorised } from 'utils/auth';

export default async (req, res) => {
  const user = isAuthorised(req);
  if (!user) {
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .json({ message: 'Auth cookie missing.' });
  }
  switch (req.method) {
    case 'GET':
      try {
        const data = await getResident(req.query.id, {
          context_flag: user.permissionFlag,
        });
        data
          ? res.status(HttpStatus.OK).json(data)
          : res
              .status(HttpStatus.NOT_FOUND)
              .json({ message: 'Resident Not Found' });
      } catch (error) {
        console.log('Resident get error:', error?.response?.data);
        error?.response?.status === HttpStatus.NOT_FOUND
          ? res
              .status(HttpStatus.NOT_FOUND)
              .json({ message: 'Resident Not Found' })
          : res
              .status(HttpStatus.INTERNAL_SERVER_ERROR)
              .json({ message: 'Unable to get the Resident' });
      }
      break;

    default:
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Invalid request method' });
  }
};
