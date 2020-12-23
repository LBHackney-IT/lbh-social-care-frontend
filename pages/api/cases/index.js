import * as HttpStatus from 'http-status-codes';

import { getCases, addCase } from 'utils/server/cases';
import { isAuthorised } from 'utils/auth';

export default async (req, res) => {
  if (!isAuthorised({ req })) {
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .json({ message: 'Auth cookie missing.' });
  }
  switch (req.method) {
    case 'GET':
      try {
        const data = await getCases(req.query);
        res.status(HttpStatus.OK).json(data);
      } catch (error) {
        console.log('Cases get error:', error?.response?.data);
        error?.response?.status === HttpStatus.NOT_FOUND
          ? res
              .status(HttpStatus.NOT_FOUND)
              .json({ message: 'Cases Not Found' })
          : res
              .status(HttpStatus.INTERNAL_SERVER_ERROR)
              .json({ message: 'Unable to get the Cases' });
      }
      break;

    case 'POST':
      try {
        const data = await addCase(req.query.id, req.body);
        res.status(HttpStatus.OK).json(data);
      } catch (error) {
        console.log('Case post error:', error?.response?.data);
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: 'Unable to post case' });
      }
      break;

    default:
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Invalid request method' });
  }
};
