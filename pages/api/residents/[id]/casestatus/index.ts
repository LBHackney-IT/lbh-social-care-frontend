import { StatusCodes } from 'http-status-codes';

import { getCaseStatusByPersonId } from 'lib/caseStatus';
import { middleware as csrfMiddleware } from 'lib/csrfToken';

import { AxiosError } from 'axios';
import {
  apiHandler,
  AuthenticatedNextApiHandler,
  handleAxiosError,
} from 'lib/apiHandler';

const endpoint: AuthenticatedNextApiHandler = async (req, res) => {
  switch (req.method) {
    case 'GET':
      try {
        const data = await getCaseStatusByPersonId(
          Number(req.query.id as string),
          req.query.include_closed_cases as string
        );
        res.status(StatusCodes.OK).json(data);
      } catch (error) {
        console.error(
          'Case status gets error:',
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
