import { StatusCodes } from 'http-status-codes';

import { searchPerson } from 'lib/search';
import { isAuthorised } from 'utils/auth';

import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import { AxiosError } from 'axios';
import { apiHandler } from 'lib/apiHandler';

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
      console.log('request in api/search/person ', req.query);

      try {
        const data = await searchPerson(
          req.query.name as string,
          req.query.date_of_birth as string,
          req.query.postcode as string,
          req.query.mosaic_id as string,
          req.query.cursor as string
        );
        res.status(StatusCodes.OK).json(data);
      } catch (error) {
        console.error(
          'Search get error:',
          (error as AxiosError)?.response?.data
        );
        (error as AxiosError)?.response?.status === StatusCodes.NOT_FOUND
          ? res
              .status(StatusCodes.NOT_FOUND)
              .json({ message: 'Residents Not Found' })
          : res
              .status(StatusCodes.INTERNAL_SERVER_ERROR)
              .json({ message: 'Unable to get the Residents' });
      }
      break;
    default:
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Invalid request method' });
  }
};

export default apiHandler(endpoint);
