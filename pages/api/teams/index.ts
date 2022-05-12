import { StatusCodes } from 'http-status-codes';
import { getTeams } from 'lib/teams';
import { middleware as csrfMiddleware } from 'lib/csrfToken';
import { AxiosError } from 'axios';
import { apiHandler, AuthenticatedNextApiHandler } from 'lib/apiHandler';
import { handleAxiosError } from 'lib/errorHandler';

const endpoint: AuthenticatedNextApiHandler = async (req, res) => {
  switch (req.method) {
    case 'GET':
      try {
        const data = await getTeams({
          context_flag: req.query?.ageContext || req.user.permissionFlag || 'B', //TODO fix this once 'B' has been added to the BE
        });
        res.status(StatusCodes.OK).json(data);
      } catch (error) {
        console.error(
          'Teams get error:',
          (error as AxiosError)?.response?.data
        );
        res = handleAxiosError(res, error as AxiosError, 'Teams');
      }
      break;

    default:
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Invalid request method' });
  }
};

export default apiHandler(csrfMiddleware(endpoint));
