import { StatusCodes } from 'http-status-codes';

import { addWarningNote } from 'lib/warningNotes';
import { middleware as csrfMiddleware } from 'lib/csrfToken';

import { AxiosError } from 'axios';
import { apiHandler, AuthenticatedNextApiHandler } from 'lib/apiHandler';

const endpoint: AuthenticatedNextApiHandler = async (req, res) => {
  switch (req.method) {
    case 'POST':
      try {
        await addWarningNote(req.body);
        res.status(StatusCodes.OK).end();
      } catch (error) {
        console.error(
          'Warning Note get error:',
          (error as AxiosError)?.response?.data
        );
        (error as AxiosError)?.response?.status === StatusCodes.NOT_FOUND
          ? res
              .status(StatusCodes.NOT_FOUND)
              .json({ message: 'Warning Note Not Found' })
          : res
              .status(StatusCodes.INTERNAL_SERVER_ERROR)
              .json({ message: 'Unable to get the Warning Note' });
      }
      break;

    default:
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Invalid request method' });
  }
};
export default apiHandler(csrfMiddleware(endpoint));
