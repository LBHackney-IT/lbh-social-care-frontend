import { StatusCodes } from 'http-status-codes';

import { getWorker, updateWorker } from 'lib/workers';
import { middleware as csrfMiddleware } from 'lib/csrfToken';

import { AxiosError } from 'axios';
import { apiHandler, AuthenticatedNextApiHandler } from 'lib/apiHandler';

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
        (error as AxiosError)?.response?.status === StatusCodes.NOT_FOUND
          ? res
              .status(StatusCodes.NOT_FOUND)
              .json({ message: 'Worker Not Found' })
          : res
              .status(StatusCodes.INTERNAL_SERVER_ERROR)
              .json({ message: 'Unable to get the Worker' });
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
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: 'Unable to update the worker' });
      }
      break;

    default:
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Invalid request method' });
      console.log(res.status);
  }
};

export default apiHandler(csrfMiddleware(endpoint));
