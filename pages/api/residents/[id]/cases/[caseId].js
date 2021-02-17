import * as HttpStatus from 'http-status-codes';

import { useCaseByResident } from 'utils/server/cases';
import { isAuthorised } from 'utils/auth';

export default async (req, res) => {
  const user = isAuthorised(req);
  if (!user) {
    return res.status(HttpStatus.UNAUTHORIZED).end();
  }
  if (!user.isAuthorised) {
    return res.status(HttpStatus.FORBIDDEN).end();
  }
  const { id, caseId, ...params } = req.query;
  switch (req.method) {
    case 'GET':
      try {
        const data = await useCaseByResident(id, caseId, {
          ...params,
          context_flag: user.permissionFlag,
        });
        data
          ? res.status(HttpStatus.OK).json(data)
          : res
              .status(HttpStatus.NOT_FOUND)
              .json({ message: 'Allocation Not Found' });
      } catch (error) {
        console.error('Cases get error:', error?.response?.data);
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: 'Unable to get the Cases' });
      }
      break;

    default:
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Invalid request method' });
  }
};
