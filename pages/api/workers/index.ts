import { StatusCodes } from 'http-status-codes';
import { isAuthorised } from 'utils/auth';

import { getWorkers, addWorker } from 'lib/workers';
import { middleware as csrfMiddleware } from 'lib/csrfToken';

import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import { AxiosError } from 'axios';
import { apiHandler } from 'lib/apiHandler';
import { handleAxiosError } from 'lib/errorHandler';

const endpoint: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const user = isAuthorised(req);
  if (!user) {
    res.status(StatusCodes.UNAUTHORIZED);
    return;
  }
  if (!user.isAuthorised) {
    res.status(StatusCodes.FORBIDDEN);
    return;
  }
  switch (req.method) {
    case 'GET':
      try {
        const data = await getWorkers(req.query);
        res.status(StatusCodes.OK).json(data);
      } catch (error) {
        console.error(
          'Workers gets an error:',
          (error as AxiosError)?.response?.data
        );
        res = handleAxiosError(res, error as AxiosError, 'Workers');
      }
      break;

    case 'POST':
      try {
        const data = await addWorker(req.body);
        res.status(StatusCodes.OK).json(data);
      } catch (error) {
        console.error(
          'Workers gets an error:',
          (error as AxiosError)?.response?.data
        );
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: 'Unable to add the worker' });
      }
      break;

    default:
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Invalid request method' });
  }
};
export default apiHandler(csrfMiddleware(endpoint));
