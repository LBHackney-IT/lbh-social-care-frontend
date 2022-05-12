import { StatusCodes } from 'http-status-codes';

import { addRelationship } from 'lib/relationships';
import { middleware as csrfMiddleware } from 'lib/csrfToken';
import { AxiosError } from 'axios';
import { apiHandler, AuthenticatedNextApiHandler } from 'lib/apiHandler';
import { handleAxiosError } from 'lib/errorHandler';

const endpoint: AuthenticatedNextApiHandler = async (req, res) => {
  switch (req.method) {
    case 'POST':
      try {
        await addRelationship(req.body);
        res.status(StatusCodes.OK).end();
      } catch (error) {
        console.error(
          'Relationship post error:',
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
