import { StatusCodes } from 'http-status-codes';

import { getTeams } from 'lib/teams';
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
    return;
  }
  switch (req.method) {
    case 'GET':
      try {
        const data = await getTeams({
          context_flag: req.query?.ageContext || user.permissionFlag || 'B', //TODO fix this once 'B' has been added to the BE
        });
        res.status(StatusCodes.OK).json(data);
      } catch (error) {
        console.error(
          'Teams get error:',
          (error as AxiosError)?.response?.data
        );
        res = handleAxiosError(res, error as AxiosError, 'Teams');
      }
      break;

    default:
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Invalid request method' });
  }
};

export default apiHandler(csrfMiddleware(endpoint));
