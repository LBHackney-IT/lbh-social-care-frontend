import * as HttpStatus from 'http-status-codes';

import { isAuthorised } from 'utils/auth';
import { getAddresses } from 'utils/server/postcode';

export default async (req, res) => {
  if (!isAuthorised({ req })) {
    return res.status(HttpStatus.UNAUTHORIZED).send('Auth cookie missing.');
  }
  switch (req.method) {
    case 'GET':
      try {
        const data = await getAddresses(req.query.postcode);
        res.status(HttpStatus.OK).json(data);
      } catch (error) {
        console.log('Postcode get error', error?.response?.data);
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .end('Unable to get the Addresses');
      }
      break;

    default:
      res.status(HttpStatus.BAD_REQUEST).json('Invalid request method');
  }
};
