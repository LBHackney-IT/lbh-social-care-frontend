import { StatusCodes } from 'http-status-codes';

import { getWorkers } from 'lib/workers';

import { AxiosError } from 'axios';
import {
  apiHandler,
  AuthenticatedNextApiHandler,
  handleAxiosError,
} from 'lib/apiHandler';
import { middleware as csrfMiddleware } from 'lib/csrfToken';

const endpoint: AuthenticatedNextApiHandler = async (req, res) => {
  switch (req.method) {
    case 'GET':
      try {
        const data = await getWorkers(req.query);
        res.status(StatusCodes.OK).json(data);
      } catch (error) {
        console.error(
          'Workers get error:',
          (error as AxiosError)?.response?.data
        );
        res = handleAxiosError(res, error as AxiosError, 'Workers');
      }
      break;

    default:
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Invalid request method' });
  }
};
export default apiHandler(csrfMiddleware(endpoint));
