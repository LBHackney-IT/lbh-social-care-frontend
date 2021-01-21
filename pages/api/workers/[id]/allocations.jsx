import * as HttpStatus from 'http-status-codes';

import { isAuthorised } from 'utils/auth';
import { getWorker, getAllocations } from 'utils/server/allocatedWorkers';
export default async (req, res) => {
  const user = isAuthorised(req);
  if (!user) {
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .json({ message: 'Auth cookie missing.' });
  }
  switch (req.method) {
    case 'GET':
      try {
        const workers = await getWorker(req.query.id, {
          context_flag: user.permissionFlag,
        });
        const allocations = await getAllocations(req.query.id, {
          context_flag: user.permissionFlag,
        });
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
