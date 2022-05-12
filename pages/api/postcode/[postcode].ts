import { StatusCodes } from 'http-status-codes';
import { getAddresses } from 'lib/postcode';
import { middleware as csrfMiddleware } from 'lib/csrfToken';

import { AxiosError } from 'axios';
import { apiHandler, AuthenticatedNextApiHandler } from 'lib/apiHandler';

const endpoint: AuthenticatedNextApiHandler = async (req, res) => {
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

export default apiHandler(csrfMiddleware(endpoint));
