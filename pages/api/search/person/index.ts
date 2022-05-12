import { StatusCodes } from 'http-status-codes';

import { searchPerson } from 'lib/search';
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
        const data = await searchPerson(req.query);
        res.status(StatusCodes.OK).json(data);
      } catch (error) {
        console.error(
          'Search get error:',
          (error as AxiosError)?.response?.data
        );
        res = handleAxiosError(res, error as AxiosError, 'Search');
      }
      break;
    default:
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Invalid request method' });
  }
};

export default apiHandler(csrfMiddleware(endpoint));
