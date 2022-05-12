import { StatusCodes } from 'http-status-codes';

import { removeRelationship } from 'lib/relationships';
import { middleware as csrfMiddleware } from 'lib/csrfToken';
import { handleAxiosError } from 'lib/errorHandler';

import { AxiosError } from 'axios';
import { apiHandler, AuthenticatedNextApiHandler } from 'lib/apiHandler';

const endpoint: AuthenticatedNextApiHandler = async (req, res) => {
  switch (req.method) {
    case 'DELETE':
      try {
        await removeRelationship(req.query.id as string);
        res.status(StatusCodes.OK).end();
      } catch (error) {
        console.error(
          'Relationship get error:',
          (error as AxiosError)?.response?.data
        );
        res = handleAxiosError(res, error as AxiosError, 'Relationship');
      }
      break;

    default:
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Invalid request method' });
  }
};

export default apiHandler(csrfMiddleware(endpoint));
