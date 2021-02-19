import { StatusCodes } from 'http-status-codes';

import { getResidentAllocation } from 'utils/server/allocatedWorkers';
import { isAuthorised } from 'utils/auth';

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
        const data = await getResidentAllocation(
          req.query.id,
          req.query.allocationId
        );
        data
          ? res.status(StatusCodes.OK).json(data)
          : res
              .status(StatusCodes.NOT_FOUND)
              .json({ message: 'Allocation Not Found' });
      } catch (error) {
        console.error('Allocations get error:', error?.response?.data);
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: 'Unable to get the Allocated Workers' });
      }
      break;

    default:
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Invalid request method' });
      console.error(res.status);
  }
};
