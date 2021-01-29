import * as HttpStatus from 'http-status-codes';

import { isAuthorised } from 'utils/auth';

export default (req, res) => {
  switch (req.method) {
    case 'GET':
      try {
        const auth = isAuthorised(req);
        !auth
          ? res.status(HttpStatus.UNAUTHORIZED).end()
          : auth.isAuthorised
          ? res.status(HttpStatus.OK).json(auth)
          : res.status(HttpStatus.FORBIDDEN).end();
      } catch (e) {
        console.error(e);
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
