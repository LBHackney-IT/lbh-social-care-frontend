import { StatusCodes } from 'http-status-codes';

import { updateCaseStatus } from 'lib/caseStatus';
import { isAuthorised } from 'utils/auth';
import { middleware as csrfMiddleware } from 'lib/csrfToken';

import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import { AxiosError } from 'axios';
import { apiHandler } from 'lib/apiHandler';
import { handleAxiosError } from 'lib/errorHandler';

const endpoint: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const user = isAuthorised(req);
  if (!user) {
    res.status(StatusCodes.UNAUTHORIZED);
    return;
  }
  if (!user.isAuthorised) {
    res.status(StatusCodes.FORBIDDEN);
  }

  switch (req.method) {
    case 'POST':
      try {
        await updateCaseStatus(Number(req.query?.caseStatusId), req.body);
        res.status(StatusCodes.OK).end();
      } catch (error) {
        console.error(
          'Case status POST error:',
          (error as AxiosError)?.response?.data
        );

        res = handleAxiosError(res, error as AxiosError, 'Case status');
      }
      break;
    default:
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Invalid request method' });
  }
};

export default apiHandler(csrfMiddleware(endpoint));
