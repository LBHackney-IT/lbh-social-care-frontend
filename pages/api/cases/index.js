import { StatusCodes } from 'http-status-codes';

import { getCases, addCase } from 'utils/server/cases';
import { isAuthorised } from 'utils/auth';

export default async (req, res) => {
  const user = isAuthorised(req);
  if (!user) {
    return res.status(StatusCodes.UNAUTHORIZED).end();
  }
  if (!user.isAuthorised) {
    return res.status(StatusCodes.FORBIDDEN).end();
  }
  switch (req.method) {
    case 'GET':
      try {
        const data = await getCases({
          ...req.query,
          context_flag: user.permissionFlag,
        });
        res.status(StatusCodes.OK).json(data);
      } catch (error) {
        console.error('Cases get error:', error?.response?.data);
        error?.response?.status === StatusCodes.NOT_FOUND
          ? res
              .status(StatusCodes.NOT_FOUND)
              .json({ message: 'Cases Not Found' })
          : res
              .status(StatusCodes.INTERNAL_SERVER_ERROR)
              .json({ message: 'Unable to get the Cases' });
      }
      break;

    case 'POST':
      try {
        const data = await addCase(req.body);
        res.status(StatusCodes.OK).json(data);
      } catch (error) {
        console.error('Case post error:', error?.response?.data);
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: 'Unable to post case' });
      }
      break;

    default:
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Invalid request method' });
  }
};
