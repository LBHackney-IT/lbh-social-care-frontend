import { StatusCodes } from 'http-status-codes';

import { isAuthorised } from 'utils/auth';
import { getWorker, updateWorker } from 'lib/workers';
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
        const data = await getWorker(parseInt(req.query.id as string, 10), {
          context_flag: user.permissionFlag,
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
