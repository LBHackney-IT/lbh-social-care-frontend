import { StatusCodes } from 'http-status-codes';

import { isAuthorised } from 'utils/auth';
import { getAddresses } from 'lib/postcode';
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
        const data = await getAddresses(
          req.query.postcode as string,
          req.query.page as string,
          req.query.buildingNumber as string
        );
        res.status(StatusCodes.OK).json(data);
      } catch (error) {
        console.error(
          'Postcode get error',
          (error as AxiosError)?.response?.data
        );
        res = handleAxiosError(res, error as AxiosError, 'Postcode');
      }
      break;

    default:
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Invalid request method' });
  }
};

export default apiHandler(csrfMiddleware(endpoint));
