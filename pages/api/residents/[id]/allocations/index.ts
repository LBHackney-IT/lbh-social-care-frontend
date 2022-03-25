import { StatusCodes } from 'http-status-codes';

import {
  getResidentAllocatedWorkers,
  deleteAllocatedWorker,
  addAllocatedWorker,
  addWorkerAllocation,
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
        const data = await getResidentAllocatedWorkers(
          parseInt(req.query.id as string, 10),
          {
            context_flag: user.permissionFlag,
          }
        );
        res.status(StatusCodes.OK).json(data);
      } catch (error) {
        console.error(
          'Allocated Workers get error:',
          (error as AxiosError)?.response?.data
        );
        (error as AxiosError)?.response?.status === StatusCodes.NOT_FOUND
          ? res
              .status(StatusCodes.NOT_FOUND)
              .json({ message: 'Allocated Workers Not Found' })
          : res
              .status(StatusCodes.INTERNAL_SERVER_ERROR)
              .json({ message: 'Unable to get the Allocated Workers' });
      }
      break;

    case 'POST':
      try {
        const request_type = req.query.type;

        if (request_type == 'add_worker_to_allocation') {
          const data = await addWorkerAllocation(
            parseInt(req.query.id as string, 10),
            {
              ...req.body,
              createdBy: user.email,
            }
          );
          res.status(StatusCodes.CREATED).json(data);
        } else {
          const data = await addAllocatedWorker(
            parseInt(req.query.id as string, 10),
            {
              ...req.body,
              createdBy: user.email,
            }
          );
          res.status(StatusCodes.CREATED).json(data);
        }
      } catch (error) {
        console.error(
          'Allocated Workers post error:',
          (error as AxiosError)?.response?.data || error
        );
        (error as AxiosError).name === 'ValidationError'
          ? res
              .status(StatusCodes.BAD_REQUEST)
              .json({ message: (error as AxiosError).message })
          : res
              .status(StatusCodes.INTERNAL_SERVER_ERROR)
              .json({ message: 'Unable to post Allocated Workers' });
      }
      break;

    case 'PATCH':
      try {
        const data = await deleteAllocatedWorker({
          ...req.body,
          createdBy: user.email,
        });
        res.status(StatusCodes.OK).json(data);
      } catch (error) {
        console.error(
          'Allocated Workers patch error:',
          (error as AxiosError)?.response?.data || error
        );
        (error as AxiosError).name === 'ValidationError'
          ? res
              .status(StatusCodes.BAD_REQUEST)
              .json({ message: (error as AxiosError).message })
          : res
              .status(StatusCodes.INTERNAL_SERVER_ERROR)
              .json({ message: 'Unable to deallocated Worker' });
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
