import { StatusCodes } from 'http-status-codes';

import { getWarningNote, updateWarningNote } from 'lib/warningNotes';
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
        const data = await getWarningNote(
          Number(req.query.warningNoteId as string)
        );
        data
          ? res.status(StatusCodes.OK).json(data)
          : res
              .status(StatusCodes.NOT_FOUND)
              .json({ message: 'Warning Note Not Found' });
      } catch (error) {
        console.error(
          'Warning Note get error:',
          (error as AxiosError)?.response?.data
        );
        res = handleAxiosError(res, error as AxiosError, 'Warning Note');
      }
      break;

    case 'PATCH':
      try {
        const data = await updateWarningNote(req.body);
        res.status(StatusCodes.OK).json(data);
      } catch (error) {
        console.error(
          'Warning Note patch error:',
          (error as AxiosError)?.response?.data
        );
        console.error('Warning Note patch request:', req);
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: 'Unable to update warning note' });
      }
      break;

    default:
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Invalid request method' });
  }
};

export default apiHandler(csrfMiddleware(endpoint));
