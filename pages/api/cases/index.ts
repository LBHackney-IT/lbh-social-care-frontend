import { StatusCodes } from 'http-status-codes';

import { getCases, addCase } from 'lib/cases';
import { middleware as csrfMiddleware } from 'lib/csrfToken';
import { handleAxiosError } from 'lib/errorHandler';

import { AxiosError } from 'axios';
import { apiHandler, AuthenticatedNextApiHandler } from 'lib/apiHandler';

const endpoint: AuthenticatedNextApiHandler = async (req, res) => {
  switch (req.method) {
    case 'GET':
      try {
        const data = await getCases({
          ...req.query,
          context_flag: req.user.permissionFlag,
        });
        res.status(StatusCodes.OK).json(data);
      } catch (error) {
        console.error(
          'Cases get error:',
          (error as AxiosError)?.response?.data
        );
        res = handleAxiosError(res, error as AxiosError, 'Cases');
      }
      break;

    case 'POST':
      try {
        const data = await addCase(req.body);
        res.status(StatusCodes.OK).json(data);
      } catch (error) {
        console.error(
          'Case post error:',
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
