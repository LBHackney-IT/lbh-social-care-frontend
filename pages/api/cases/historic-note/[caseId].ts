import { StatusCodes } from 'http-status-codes';
import { apiHandler, AuthenticatedNextApiHandler } from 'lib/apiHandler';
import { getHistoricNote } from 'lib/cases';
import { middleware as csrfMiddleware } from 'lib/csrfToken';
import { AxiosError } from 'axios';
import { handleAxiosError } from 'lib/errorHandler';

const endpoint: AuthenticatedNextApiHandler = async (req, res) => {
  const { caseId, ...params } = req.query;
  switch (req.method) {
    case 'GET':
      try {
        const data = await getHistoricNote(caseId as string, {
          ...params,
          context_flag: req.user.permissionFlag,
        });
        data
          ? res.status(StatusCodes.OK).json(data)
          : res
              .status(StatusCodes.NOT_FOUND)
              .json({ message: 'Historic Note Not Found' });
      } catch (error) {
        console.error(
          'Historic Note get error:',
          (error as AxiosError)?.response?.data
        );
        res = handleAxiosError(res, error as AxiosError, 'Historic Note');
      }
      break;

    default:
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Invalid request method' });
  }
};

export default apiHandler(csrfMiddleware(endpoint));
