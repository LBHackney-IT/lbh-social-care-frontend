import * as HttpStatus from 'http-status-codes';

import {
  getResidentAllocatedWorkers,
  deleteResidentAllocatedWorker,
  addAllocatedWorker,
} from 'utils/server/allocatedWorkers';
import { isAuthorised } from 'utils/auth';

export default async (req, res) => {
  const user = isAuthorised({ req });
  if (!user) {
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .json({ message: 'Auth cookie missing.' });
  }
  switch (req.method) {
    case 'GET':
      try {
        const data = await getResidentAllocatedWorkers(req.query.id, {
          context_flag: user.permissionFlag,
        });
        res.status(HttpStatus.OK).json(data);
      } catch (error) {
        console.log('Allocated Workers get error:', error?.response?.data);
        error?.response?.status === HttpStatus.NOT_FOUND
          ? res
              .status(HttpStatus.NOT_FOUND)
              .json({ message: 'Allocated Workers Not Found' })
          : res
              .status(HttpStatus.INTERNAL_SERVER_ERROR)
              .json({ message: 'Unable to get the Allocated Workers' });
      }
      break;

    case 'POST':
      try {
        const data = await addAllocatedWorker(req.query.id, req.body);
        res.status(HttpStatus.CREATED).json(data);
      } catch (error) {
        console.log(
          'Allocated Workers post error:',
          error?.response?.data || error
        );
        error.name === 'ValidationError'
          ? res.status(HttpStatus.BAD_REQUEST).json({ message: error.message })
          : res
              .status(HttpStatus.INTERNAL_SERVER_ERROR)
              .json({ message: 'Unable to post Allocated Workers' });
      }
      break;

    case 'PATCH':
      try {
        const data = await deleteResidentAllocatedWorker(
          req.query.id,
          JSON.stringify(req.body)
        );
        res.status(HttpStatus.OK).json(data);
      } catch (error) {
        console.log('Allocated Workers patch error:', error?.response?.data);
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: 'Unable to deallocated Worker' });
      }
      break;

    default:
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Invalid request method' });
      console.log(res.status);
  }
};
