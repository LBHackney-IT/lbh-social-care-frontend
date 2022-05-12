import { StatusCodes } from 'http-status-codes';

import { isAuthorised } from 'utils/auth';
import { getWorkerByEmail } from 'lib/workers';
import { getAllocationsByWorker } from 'lib/allocatedWorkers';
import { middleware as csrfMiddleware } from 'lib/csrfToken';

import { AxiosError } from 'axios';
import { apiHandler, AuthenticatedNextApiHandler } from 'lib/apiHandler';

const endpoint: AuthenticatedNextApiHandler = async (req, res) => {
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
        console.log('User get error:', (error as AxiosError)?.response?.data);
        (error as AxiosError)?.response?.status === StatusCodes.NOT_FOUND
          ? res
              .status(StatusCodes.NOT_FOUND)
              .json({ message: 'User Not Found' })
          : res
              .status(StatusCodes.INTERNAL_SERVER_ERROR)
              .json({ message: 'Unable to get the User' });
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
