import { StatusCodes } from 'http-status-codes';

import { getWorker, updateWorker } from 'lib/workers';
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
        const data = await getWorker(parseInt(req.query.id as string, 10), {
          context_flag: req.user.permissionFlag,
        });
        res.status(StatusCodes.OK).json(data);
      } catch (error) {
        console.log('Worker get error:', (error as AxiosError)?.response?.data);
        res = handleAxiosError(res, error as AxiosError, 'Worker');
      }
      break;

    case 'PATCH':
      try {
        const data = await updateWorker(req.body);
        res.status(StatusCodes.OK).json(data);
      } catch (error) {
        console.error(
          'Workers gets an error:',
          (error as AxiosError)?.response?.data
        );
        res = handleAxiosError(res, error as AxiosError, 'Worker');
      }
      break;

    default:
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Invalid request method' });
  }
};

export default apiHandler(csrfMiddleware(endpoint));
