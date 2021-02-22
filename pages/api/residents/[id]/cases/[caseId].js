import { StatusCodes } from 'http-status-codes';

import { getCaseByResident } from 'utils/server/cases';
import { isAuthorised } from 'utils/auth';

export default async (req, res) => {
  const user = isAuthorised(req);
  if (!user) {
    return res.status(StatusCodes.UNAUTHORIZED).end();
  }
  if (!user.isAuthorised) {
    return res.status(StatusCodes.FORBIDDEN).end();
  }
  const { id, caseId, ...params } = req.query;
  switch (req.method) {
    case 'GET':
      try {
        const data = await getCaseByResident(id, caseId, {
          ...params,
          context_flag: user.permissionFlag,
        });
        data
          ? res.status(StatusCodes.OK).json(data)
          : res
              .status(StatusCodes.NOT_FOUND)
              .json({ message: 'Allocation Not Found' });
      } catch (error) {
        console.error('Cases get error:', error?.response?.data);
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: 'Unable to get the Cases' });
      }
      break;

    default:
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Invalid request method' });
  }
};
