import { StatusCodes } from 'http-status-codes';
import { middleware as csrfMiddleware } from 'lib/csrfToken';

import { AxiosError } from 'axios';
import { resetDummyData } from 'lib/mashReferral';
import { apiHandler, AuthenticatedNextApiHandler } from 'lib/apiHandler';
import { handleAxiosError } from 'lib/errorHandler';
const endpoint: AuthenticatedNextApiHandler = async (req, res) => {
  switch (req.method) {
    case 'POST':
      try {
        await resetDummyData();
        res.status(StatusCodes.OK).json(undefined);
      } catch (error: unknown) {
        res = handleAxiosError(res, error as AxiosError, 'Mash referral reset');
      }
      break;

    default:
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Invalid request method' });
  }
};

export default apiHandler(csrfMiddleware(endpoint));
