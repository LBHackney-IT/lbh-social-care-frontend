import { StatusCodes } from 'http-status-codes';

import { isAuthorised } from 'utils/auth';
import { getAddresses } from 'lib/postcode';

import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import { AxiosError } from 'axios';
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
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: 'Unable to get the Addresses' });
      }
      break;

    default:
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Invalid request method' });
  }
};

export default apiHandler(endpoint);
