import { StatusCodes } from 'http-status-codes';

import { getWarningNote, updateWarningNote } from 'lib/warningNotes';
import { isAuthorised } from 'utils/auth';

import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import { AxiosError } from 'axios';
import { apiHandler } from 'lib/apiHandler';

const endpoint: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const user = isAuthorised(req);
  if (!user) {
    return res.status(StatusCodes.UNAUTHORIZED);
  }
  if (!user.isAuthorised) {
    return res.status(StatusCodes.FORBIDDEN);
  }
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
        (error as AxiosError)?.response?.status === StatusCodes.NOT_FOUND
          ? res
              .status(StatusCodes.NOT_FOUND)
              .json({ message: 'Warning Note Not Found' })
          : res
              .status(StatusCodes.INTERNAL_SERVER_ERROR)
              .json({ message: 'Unable to get the Warning Note' });
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

export default apiHandler(endpoint);
