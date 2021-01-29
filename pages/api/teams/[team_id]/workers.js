import * as HttpStatus from 'http-status-codes';

import { getWorkers } from 'utils/server/workers';
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
        const data = await getWorkers(req.query);
        res.status(HttpStatus.OK).json(data);
      } catch (error) {
        console.error('Workers get error:', error?.response?.data);
        error?.response?.status === HttpStatus.NOT_FOUND
          ? res
              .status(HttpStatus.NOT_FOUND)
              .json({ message: 'Workers Not Found' })
          : res
              .status(HttpStatus.INTERNAL_SERVER_ERROR)
              .json({ message: 'Unable to get the Workers' });
      }
      break;

    default:
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Invalid request method' });
  }
};
