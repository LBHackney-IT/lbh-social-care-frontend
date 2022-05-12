import { StatusCodes } from 'http-status-codes';

import { getCase } from 'lib/cases';
import { middleware as csrfMiddleware } from 'lib/csrfToken';
import { AxiosError } from 'axios';
import {
  apiHandler,
  AuthenticatedNextApiHandler,
  handleAxiosError,
} from 'lib/apiHandler';

const endpoint: AuthenticatedNextApiHandler = async (req, res) => {
  const { caseId, residentId, ...params } = req.query;
  switch (req.method) {
    case 'GET':
      try {
        const data = await getCase(
          caseId as string,
          {
            ...params,
            residentId: Number(residentId),
            context_flag: req.user?.permissionFlag,
          },
          req.user
        );
        data
          ? res.status(StatusCodes.OK).json(data)
          : res
              .status(StatusCodes.NOT_FOUND)
              .json({ message: 'Allocation Not Found' });
      } catch (error) {
        console.error(
          'Cases get error:',
          (error as AxiosError)?.response?.data
        );
        res = handleAxiosError(res, error as AxiosError, 'Cases');
      }
      break;

    default:
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Invalid request method' });
  }
};

export default apiHandler(csrfMiddleware(endpoint));
