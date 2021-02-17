import * as HttpStatus from 'http-status-codes';

import { useResidentAllocation } from 'utils/server/allocatedWorkers';
import { isAuthorised } from 'utils/auth';

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
        const data = await useResidentAllocation(
          req.query.id,
          req.query.allocationId
        );
        data
          ? res.status(HttpStatus.OK).json(data)
          : res
              .status(HttpStatus.NOT_FOUND)
              .json({ message: 'Allocation Not Found' });
      } catch (error) {
        console.error('Allocations get error:', error?.response?.data);
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: 'Unable to get the Allocated Workers' });
      }
      break;

    default:
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Invalid request method' });
      console.error(res.status);
  }
};
