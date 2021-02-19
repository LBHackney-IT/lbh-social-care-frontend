import { StatusCodes } from 'http-status-codes';

import { getCasesByResident } from 'utils/server/cases';
import { isAuthorised } from 'utils/auth';

export default async (req, res) => {
  const user = isAuthorised(req);
  if (!user) {
    return res.status(StatusCodes.UNAUTHORIZED).end();
  }
  if (!user.isAuthorised) {
    return res.status(StatusCodes.FORBIDDEN).end();
  }
  const { id, ...params } = req.query;
  switch (req.method) {
    case 'GET':
      try {
        const data = await getCasesByResident(id, {
          ...params,
          context_flag: user.permissionFlag,
        });
        res.status(StatusCodes.OK).json(data);
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
