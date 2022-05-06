import { StatusCodes } from 'http-status-codes';

import { isAuthorised } from 'utils/auth';

import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';

import { AxiosError } from 'axios';
import { resetDummyData } from 'lib/mashReferral';
import { apiHandler } from 'lib/apiHandler';

const endpoint: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const user = isAuthorised(req);
  if (!user) {
    return res.status(StatusCodes.UNAUTHORIZED);
  }
  if (!user.isAuthorised) {
    return res.status(StatusCodes.FORBIDDEN);
  }
  switch (req.method) {
    case 'POST':
      try {
        await resetDummyData();
        res.status(StatusCodes.OK).json(undefined);
      } catch (error: unknown) {
        const axiosError = error as AxiosError;
        res
          .status(axiosError.response?.status || 500)
          .json(axiosError?.response?.data);
      }
      break;

    default:
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Invalid request method' });
  }
};

export default apiHandler(endpoint);
