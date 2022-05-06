import { StatusCodes } from 'http-status-codes';

import { getCaseStatusByPersonId } from 'lib/caseStatus';
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
        const data = await getCaseStatusByPersonId(
          Number(req.query.id as string),
          req.query.include_closed_cases as string
        );
        res.status(StatusCodes.OK).json(data);
      } catch (error) {
        console.error(
          'Case status gets error:',
          (error as AxiosError)?.response?.data
        );
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: 'Unable to get the case status' });
      }

      break;

    default:
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Invalid request method' });
  }
};

export default apiHandler(endpoint);
