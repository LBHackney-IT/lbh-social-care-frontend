import * as HttpStatus from 'http-status-codes';

import { getResidents } from 'utils/server/residents';
import { isAuthorised } from 'utils/auth';

export default async (req, res) => {
  if (!isAuthorised({ req })) {
    return res.status(HttpStatus.UNAUTHORIZED).send('Auth cookie missing.');
  }
  switch (req.method) {
    case 'GET':
      try {
        const data = await getResidents(req.query);
        if (data?.residents?.length > 0) {
          res.status(HttpStatus.OK).json(data);
        } else {
          res.status(HttpStatus.NOT_FOUND).json('Residents Not Found');
        }
      } catch (error) {
        console.log('Residents get error:', error);
        error?.response?.status === HttpStatus.NOT_FOUND
          ? res.status(HttpStatus.NOT_FOUND).json('Residents Not Found')
          : res
              .status(HttpStatus.INTERNAL_SERVER_ERROR)
              .json('Unable to get the Residents');
      }
      break;

    default:
      res.status(HttpStatus.BAD_REQUEST).json('Invalid request method');
  }
};
