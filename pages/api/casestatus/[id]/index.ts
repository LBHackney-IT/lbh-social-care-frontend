import { StatusCodes } from 'http-status-codes';

import { patchCaseStatus } from 'lib/caseStatus';
import { middleware as csrfMiddleware } from 'lib/csrfToken';

import { AxiosError } from 'axios';
import { apiHandler, AuthenticatedNextApiHandler } from 'lib/apiHandler';
import { handleAxiosError } from 'lib/errorHandler';

const endpoint: AuthenticatedNextApiHandler = async (req, res) => {
  switch (req.method) {
    case 'PATCH':
      try {
        await patchCaseStatus(Number(req.query?.id), req.body);
        res.status(StatusCodes.OK).end();
      } catch (error) {
        console.error(
          'Case status PATCH error:',
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
