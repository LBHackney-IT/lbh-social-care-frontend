import { StatusCodes } from 'http-status-codes';

import { isAuthorised } from 'utils/auth';
import { getWorker } from 'utils/server/workers';
import { getAllocationsByWorker } from 'utils/server/allocatedWorkers';

export default async (req, res) => {
  const user = isAuthorised(req);
  if (!user) {
    return res.status(StatusCodes.UNAUTHORIZED).end();
  }
  if (!user.isAuthorised) {
    return res.status(StatusCodes.FORBIDDEN).end();
  }
  switch (req.method) {
    case 'GET':
      try {
        const workersData = getWorker(req.query.id, {
          context_flag: user.permissionFlag,
        });
        const allocationsData = getAllocationsByWorker(req.query.id, {
          context_flag: user.permissionFlag,
        });

        const [workers, allocations] = await Promise.all([
          workersData,
          allocationsData,
        ]);
        const data = { ...workers, ...allocations };

        res.status(StatusCodes.OK).json(data);
      } catch (error) {
        console.log('Allocation Worker get error:', error?.response?.data);
        error?.response?.status === StatusCodes.NOT_FOUND
          ? res
              .status(StatusCodes.NOT_FOUND)
              .json({ message: 'Allocation Worker Not Found' })
          : res
              .status(StatusCodes.INTERNAL_SERVER_ERROR)
              .json({ message: 'Unable to get the Allocation Worker' });
      }
      break;

    default:
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Invalid request method' });
      console.log(res.status);
  }
};
