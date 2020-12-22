import * as HttpStatus from 'http-status-codes';

import { getCasesByResident } from 'utils/server/cases';
import { isAuthorised } from 'utils/auth';

export default async (req, res) => {
  if (!isAuthorised({ req })) {
    return res.status(HttpStatus.UNAUTHORIZED).send('Auth cookie missing.');
  }
  const { id, ...params } = req.query;
  switch (req.method) {
    case 'GET':
      try {
        const data = await getCasesByResident(id, params);
        res.status(HttpStatus.OK).json(data);
      } catch (error) {
        console.log('Cases get error:', error?.response?.data);
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json('Unable to get the Cases');
      }
      break;

    default:
      res.status(HttpStatus.BAD_REQUEST).json('Invalid request method');
  }
};
