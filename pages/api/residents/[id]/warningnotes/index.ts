import { StatusCodes } from 'http-status-codes';

import { getWarningNotesByResident } from 'lib/warningNotes';
import { middleware as csrfMiddleware } from 'lib/csrfToken';

import { AxiosError } from 'axios';
import { apiHandler, AuthenticatedNextApiHandler } from 'lib/apiHandler';
import { handleAxiosError } from 'lib/errorHandler';

const endpoint: AuthenticatedNextApiHandler = async (req, res) => {
  switch (req.method) {
    case 'GET':
      try {
        const data = await getWarningNotesByResident(
          Number(req.query.id as string)
        );
        res.status(StatusCodes.OK).json(data);
      } catch (error) {
        console.error(
          'Warning Notes get error:',
          (error as AxiosError)?.response?.data
        );
        res = handleAxiosError(res, error as AxiosError, 'Warning Notes');
      }
      break;

    default:
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Invalid request method' });
  }
};

export default apiHandler(csrfMiddleware(endpoint));
