import { StatusCodes } from 'http-status-codes';

import { getWorker } from 'lib/workers';
import { getAllocationsByWorker } from 'lib/allocatedWorkers';
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
        const workersData = getWorker(parseInt(req.query.id as string, 10), {
          context_flag: req.user.permissionFlag,
        });
        const allocationsData = getAllocationsByWorker(
          parseInt(req.query.id as string, 10),
          req.query.sort_by as string,
          {
            context_flag: req.user.permissionFlag,
          }
        );

        const [workers, allocations] = await Promise.all([
          workersData,
          allocationsData,
        ]);
        const data = { ...workers, ...allocations };

        res.status(StatusCodes.OK).json(data);
      } catch (error) {
        console.log(
          'Allocation Worker get error:',
          (error as AxiosError)?.response?.data
        );
        res = handleAxiosError(res, error as AxiosError, 'Allocation Worker');
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
