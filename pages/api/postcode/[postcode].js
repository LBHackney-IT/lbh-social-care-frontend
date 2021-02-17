import * as HttpStatus from 'http-status-codes';

import { isAuthorised } from 'utils/auth';
import { getAddresses } from 'utils/server/postcode';

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
        const data = await getAddresses(req.query.postcode);
        res.status(HttpStatus.OK).json(data);
      } catch (error) {
        console.error('Postcode get error', error?.response?.data);
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: 'Unable to get the Addresses' });
      }
      break;

    default:
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Invalid request method' });
  }
};
