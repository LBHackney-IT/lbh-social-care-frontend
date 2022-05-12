import { StatusCodes } from 'http-status-codes';
import { getHistoricVisit } from 'lib/cases';
import { middleware as csrfMiddleware } from 'lib/csrfToken';
import { AxiosError } from 'axios';
import { apiHandler, AuthenticatedNextApiHandler } from 'lib/apiHandler';

const endpoint: AuthenticatedNextApiHandler = async (req, res) => {
  const { caseId, ...params } = req.query;
  switch (req.method) {
    case 'GET':
      try {
        const data = await getHistoricVisit(caseId as string, {
          ...params,
          context_flag: req.user.permissionFlag,
        });
        data
          ? res.status(StatusCodes.OK).json(data)
          : res
              .status(StatusCodes.NOT_FOUND)
              .json({ message: 'Historic Visit Not Found' });
      } catch (error) {
        console.error(
          'Historic Visit get error:',
          (error as AxiosError)?.response?.data
        );
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: 'Unable to get the Historic Visit' });
      }
      break;

    default:
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Invalid request method' });
  }
};

export default apiHandler(csrfMiddleware(endpoint));
