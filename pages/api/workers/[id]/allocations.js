import * as HttpStatus from 'http-status-codes';

import { isAuthorised } from 'utils/auth';
import { getWorker } from 'utils/server/workers';
import { getAllocationsByWorker } from 'utils/server/allocatedWorkers';

export default async (req, res) => {
  const user = isAuthorised(req);
  if (!user) {
    return res.status(HttpStatus.UNAUTHORIZED).end();
  }
  if (!user.isAuthorised) {
    return res.status(HttpStatus.FORBIDDEN).end();
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

        res.status(HttpStatus.OK).json(data);
      } catch (error) {
        console.log('Allocation Worker get error:', error?.response?.data);
        error?.response?.status === HttpStatus.NOT_FOUND
          ? res
              .status(HttpStatus.NOT_FOUND)
              .json({ message: 'Allocation Worker Not Found' })
          : res
              .status(HttpStatus.INTERNAL_SERVER_ERROR)
              .json({ message: 'Unable to get the Allocation Worker' });
      }
      break;

    default:
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Invalid request method' });
      console.log(res.status);
  }
};
