import { StatusCodes } from 'http-status-codes';

import { getResident, updateResident } from 'lib/residents';
import { middleware as csrfMiddleware } from 'lib/csrfToken';

import { AxiosError } from 'axios';
import {
  apiHandler,
  AuthenticatedNextApiHandler,
  handleAxiosError,
} from 'lib/apiHandler';

const endpoint: AuthenticatedNextApiHandler = async (req, res) => {
  const id = parseInt(req.query.id as string, 10);
  switch (req.method) {
    case 'GET':
      try {
        const data = await getResident(id, req.user);
        data
          ? res.status(StatusCodes.OK).json(data)
          : res
              .status(StatusCodes.NOT_FOUND)
              .json({ message: 'Resident Not Found' });
      } catch (error) {
        console.error(
          'Resident get error:',
          (error as AxiosError)?.response?.data
        );

        const axiosError = error as AxiosError;

        (error as AxiosError)?.response?.status === StatusCodes.NOT_FOUND
          ? res
              .status(StatusCodes.NOT_FOUND)
              .json({ message: 'Resident Not Found' })
          : res
              .status(axiosError.response?.status || 500)
              .json(axiosError?.response?.data);
      }
      break;

    case 'PATCH':
      try {
        const data = await updateResident({
          id,
          ...req.body,
          createdBy: req.body.createdBy || req.user.email,
        });
        res.status(StatusCodes.OK).json(data);
      } catch (error) {
        console.error('Resident patch error:', error);
        res = handleAxiosError(res, error as AxiosError, 'Resident');
      }
      break;

    default:
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Invalid request method' });
  }
};

export default apiHandler(csrfMiddleware(endpoint));
