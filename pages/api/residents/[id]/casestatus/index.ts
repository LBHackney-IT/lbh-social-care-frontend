import { StatusCodes } from 'http-status-codes';

import {
  getCaseStatusByPersonId,
  getCaseStatusByPersonIdIncludeEnded,
} from 'lib/caseStatus';
import { isAuthorised } from 'utils/auth';

import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';

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
      if (req.query.includeEnded) {
        console.log('INCLUDE END');
        try {
          const data = await getCaseStatusByPersonIdIncludeEnded(
            Number(req.query.id as string)
          );
          res.status(StatusCodes.OK).json(data[0]);
        } catch (error) {
          console.error('Case status gets error:', error?.response?.data);
          res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: 'Unable to get the case status' });
        }
      } else {
        console.log('Don`t include end');
        try {
          const data = await getCaseStatusByPersonId(
            Number(req.query.id as string)
          );
          res.status(StatusCodes.OK).json(data);
        } catch (error) {
          console.error('Case status gets error:', error?.response?.data);
          res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: 'Unable to get the case status' });
        }
      }
      break;

    default:
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Invalid request method' });
  }
};

export default endpoint;
