import { StatusCodes } from 'http-status-codes';

import { patchCaseStatus } from 'lib/caseStatus';
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
    res.status(StatusCodes.UNAUTHORIZED);
    return;
  }
  if (!user.isAuthorised) {
    res.status(StatusCodes.FORBIDDEN);
    return;
  }

  switch (req.method) {
    case 'PATCH':
      try {
        await patchCaseStatus(Number(req.query?.id), req.body);
        res.status(StatusCodes.OK).end();
      } catch (error) {
        console.error(
          'Case status PATCH error:',
          (error as AxiosError)?.response?.data
        );

        (error as AxiosError)?.response?.status === StatusCodes.NOT_FOUND
          ? res
              .status(StatusCodes.NOT_FOUND)
              .json({ message: 'Case Status Not Found' })
          : res
              .status(
                (error as AxiosError)?.response?.status ||
                  StatusCodes.INTERNAL_SERVER_ERROR
              )
              .json({
                status: (error as AxiosError)?.response?.status,
                message: (error as AxiosError)?.response?.data,
              });
      }
      break;

    default:
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Invalid request method' });
  }
};

export default apiHandler(endpoint);
