import { StatusCodes } from 'http-status-codes';

import {
  getResidentAllocation,
  patchResidentAllocation,
} from 'lib/allocatedWorkers';
import { isAuthorised } from 'utils/auth';

import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import { AxiosError } from 'axios';
import { apiHandler } from 'lib/apiHandler';

const endpoint: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
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
          parseInt(req.query.id as string, 10),
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
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: 'Unable to get the Allocated Workers' });
      }
      break;
    case 'PATCH':
      try {
        await patchResidentAllocation(
          parseInt(req.query.id as string, 10),
          parseInt(req.query.allocationId as string, 10),
          req.body
        );
        res.status(StatusCodes.OK).end();
      } catch (error) {
        console.error(
          'Allocation PATCH error:',
          (error as AxiosError)?.response?.data
        );

        (error as AxiosError)?.response?.status === StatusCodes.NOT_FOUND
          ? res
              .status(StatusCodes.NOT_FOUND)
              .json({ message: 'Case Status Not Found' })
          : res
              .status(
                (error as AxiosError)?.response?.status ||
                  StatusCodes.INTERNAL_SERVER_ERROR
              )
              .json({
                status: (error as AxiosError)?.response?.status,
                message: (error as AxiosError)?.response?.data,
              });
      }
      break;
    default:
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Invalid request method' });
      console.error(res.status);
  }
};

export default apiHandler(endpoint);
