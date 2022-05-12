import { StatusCodes } from 'http-status-codes';

import { getResidentAllocation } from 'lib/allocatedWorkers';
import { middleware as csrfMiddleware } from 'lib/csrfToken';
import { AxiosError } from 'axios';
import { apiHandler, AuthenticatedNextApiHandler } from 'lib/apiHandler';
import { handleAxiosError } from 'lib/errorHandler';

const endpoint: AuthenticatedNextApiHandler = async (req, res) => {
  switch (req.method) {
    case 'GET':
      try {
        const data = await getResidentAllocation(
          parseInt(req.query.allocationId as string, 10)
        );
        data
          ? res.status(StatusCodes.OK).json(data)
          : res
              .status(StatusCodes.NOT_FOUND)
              .json({ message: 'Allocation Not Found' });
      } catch (error) {
        console.error(
          'Allocations get error:',
          (error as AxiosError)?.response?.data
        );
        res = handleAxiosError(res, error as AxiosError, 'Allocations');
      }
      break;
    default:
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Invalid request method' });
      console.error(res.status);
  }
};

export default apiHandler(csrfMiddleware(endpoint));
