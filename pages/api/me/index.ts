import { StatusCodes } from 'http-status-codes';

import { isAuthorised } from 'utils/auth';
import { getWorkerByEmail } from 'lib/workers';
import { getAllocationsByWorker } from 'lib/allocatedWorkers';
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
        const workerData = await getWorkerByEmail(user.email, {
          context_flag: user.permissionFlag,
        });
        if (!workerData) {
          return res
            .status(StatusCodes.NOT_FOUND)
            .json({ message: 'User Not Found' });
        }
        const allocations = await getAllocationsByWorker(
          workerData.id,
          req.query.sort_by as string,
          {
            context_flag: user.permissionFlag,
          }
        );
        res
          .status(StatusCodes.OK)
          .json({ ...workerData, ...allocations, auth: user });
      } catch (error) {
        res = handleAxiosError(res, error as AxiosError, 'User');
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
