import { StatusCodes } from 'http-status-codes';

import { updateCaseStatus } from 'lib/caseStatus';
import { middleware as csrfMiddleware } from 'lib/csrfToken';

import { AxiosError } from 'axios';
import {
  apiHandler,
  AuthenticatedNextApiHandler,
  handleAxiosError,
} from 'lib/apiHandler';

const endpoint: AuthenticatedNextApiHandler = async (req, res) => {
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
