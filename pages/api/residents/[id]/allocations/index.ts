import { StatusCodes } from 'http-status-codes';

import {
  getResidentAllocatedWorkers,
  deleteAllocation,
  patchAllocation,
  addAllocatedWorker,
  addWorkerAllocation,
} from 'lib/allocatedWorkers';
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
        const data = await getResidentAllocatedWorkers(
          parseInt(req.query.id as string, 10),
          {
            context_flag: req.user.permissionFlag,
          }
        );
        res.status(StatusCodes.OK).json(data);
      } catch (error) {
        console.error(
          'Allocated Workers get error:',
          (error as AxiosError)?.response?.data
        );
        res = handleAxiosError(res, error as AxiosError, 'Allocated Workers');
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
              createdBy: req.user.email,
            }
          );
          res.status(StatusCodes.CREATED).json(data);
        } else {
          const data = await addAllocatedWorker(
            parseInt(req.query.id as string, 10),
            {
              ...req.body,
              createdBy: req.user.email,
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
        const type = req.query.type;

        if (type == 'edit') {
          const data = await patchAllocation({
            ...req.body,
            createdBy: req.user.email,
          });
          res.status(StatusCodes.OK).json(data);
        } else {
          const data = await deleteAllocation({
            ...req.body,
            createdBy: req.user.email,
          });
          res.status(StatusCodes.OK).json(data);
        }
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
              .json({ message: 'Unable to deallocate Worker' });
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
