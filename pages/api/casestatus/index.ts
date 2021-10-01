import { StatusCodes } from 'http-status-codes';

import { addCaseStatus, patchCaseStatus } from 'lib/caseStatus';
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
    case 'POST':
      try {
        await addCaseStatus(req.body);
        res.status(StatusCodes.OK).end();
      } catch (error) {
        console.error('Case status POST error:', error?.response?.data);

        error?.response?.status === StatusCodes.NOT_FOUND
          ? res
              .status(StatusCodes.NOT_FOUND)
              .json({ message: 'Case Status Not Found' })
          : res
              .status(StatusCodes.BAD_REQUEST)
              .json({ message: 'Unable to add the casestatus' });
      }
      break;
    case 'PATCH':
      try {
        await patchCaseStatus(Number(req.query?.caseStatusId), req.body);
        res.status(StatusCodes.OK).end();
      } catch (error) {
        console.error('Case status PATCH error:', error?.response?.data);

        error?.response?.status === StatusCodes.NOT_FOUND
          ? res
              .status(StatusCodes.NOT_FOUND)
              .json({ message: 'Case Status Not Found' })
          : res
              .status(StatusCodes.BAD_REQUEST)
              .json({ message: 'Unable to add the casestatus' });
      }
      break;

    default:
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Invalid request method' });
  }
};

export default endpoint;
