import * as HttpStatus from 'http-status-codes';

import { getAllocatedWorkers } from 'utils/server/allocatedWorkers';
import { isAuthorised } from 'utils/auth';

export default async (req, res) => {
  if (!isAuthorised({ req })) {
    return res.status(HttpStatus.UNAUTHORIZED).send('Auth cookie missing.');
  }
  switch (req.method) {
    case 'GET':
      try {
        const data = await getAllocatedWorkers(req.query);
        if (data?.ascAllocations?.length > 0) {
          res.status(HttpStatus.OK).json(data);
        } else {
          res.status(HttpStatus.NOT_FOUND).json('Allocated Workers Not Found');
        }
      } catch (error) {
        console.log('Allocated Workers get error:', error.response.data);
        error?.response?.status === HttpStatus.NOT_FOUND
          ? res.status(HttpStatus.NOT_FOUND).json('Allocated Workers Not Found')
          : res
              .status(HttpStatus.INTERNAL_SERVER_ERROR)
              .json('Unable to get the Allocated Workers');
      }
      break;

    // case 'POST':
    //   try {
    //     const data = await addAllocatedWorker(req.query.id, req.body);
    //     res.status(HttpStatus.OK).json(data);
    //   } catch (error) {
    //     console.log('Allocated Workers post error:', error.response.data);
    //     res
    //       .status(HttpStatus.INTERNAL_SERVER_ERROR)
    //       .json('Unable to post Allocated Workers');
    //   }
    //   break;

    default:
      res.status(HttpStatus.BAD_REQUEST).json('Invalid request method');
      console.log(res.status);
  }
};
