import * as HttpStatus from 'http-status-codes';

import { getResident } from 'utils/server/residents';
import { isAuthorised } from 'utils/auth';

export default async (req, res) => {
  if (!isAuthorised({ req })) {
    return res.status(HttpStatus.UNAUTHORIZED).send('Auth cookie missing.');
  }
  switch (req.method) {
    case 'GET':
      try {
        const data = await getResident(req.query.id);
        res.status(HttpStatus.OK).json(data);
      } catch (error) {
        console.log('Resident get error:', error.response.data);
        error?.response?.status === HttpStatus.NOT_FOUND
          ? res.status(HttpStatus.NOT_FOUND).json('Resident Not Found')
          : res
              .status(HttpStatus.INTERNAL_SERVER_ERROR)
              .json('Unable to get the Resident');
      }
      break;

    default:
      res.status(HttpStatus.BAD_REQUEST).json('Invalid request method');
  }
};
