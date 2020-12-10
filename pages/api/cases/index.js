import * as HttpStatus from 'http-status-codes';

import { getCases, addCase } from 'utils/server/cases';
import { isAuthorised } from 'utils/auth';

export default async (req, res) => {
  if (!isAuthorised({ req })) {
    return res.status(HttpStatus.UNAUTHORIZED).send('Auth cookie missing.');
  }
  switch (req.method) {
    case 'GET':
      try {
        const data = await getCases(req.query);
        if (data?.cases?.length > 0) {
          res.status(HttpStatus.OK).json(data);
        } else {
          res.status(HttpStatus.NOT_FOUND).json('Cases Not Found');
        }
      } catch (error) {
        console.log('Cases get error:', error);
        error?.response?.status === HttpStatus.NOT_FOUND
          ? res.status(HttpStatus.NOT_FOUND).json('Cases Not Found')
          : res
              .status(HttpStatus.INTERNAL_SERVER_ERROR)
              .json('Unable to get the Cases');
      }
      break;

    case 'POST':
      try {
        const data = await addCase(req.query.id, req.body);
        res.status(HttpStatus.OK).json(data);
      } catch (error) {
        console.log(error.status);
        console.log('Case post error:', error);
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json('Unable to post case');
      }
      break;

    default:
      res.status(HttpStatus.BAD_REQUEST).json('Invalid request method');
      console.log(res.status);
  }
};
