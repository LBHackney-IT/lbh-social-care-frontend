import { StatusCodes } from 'http-status-codes';

import { getRelationshipByResident } from 'lib/relationships';
import { middleware as csrfMiddleware } from 'lib/csrfToken';

import { AxiosError } from 'axios';
import {
  apiHandler,
  AuthenticatedNextApiHandler,
  handleAxiosError,
} from 'lib/apiHandler';

const endpoint: AuthenticatedNextApiHandler = async (req, res) => {
  switch (req.method) {
    case 'GET':
      try {
        const data = await getRelationshipByResident(
          Number(req.query.id as string)
        );
        res.status(StatusCodes.OK).json(data);
      } catch (error) {
        console.error(
          'Relationships get error:',
          (error as AxiosError)?.response?.data
        );
        res = handleAxiosError(res, error as AxiosError, 'Relationships');
      }
      break;

    default:
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Invalid request method' });
  }
};

export default apiHandler(csrfMiddleware(endpoint));
