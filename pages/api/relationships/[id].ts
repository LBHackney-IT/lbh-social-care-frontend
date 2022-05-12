import { StatusCodes } from 'http-status-codes';

import { removeRelationship } from 'lib/relationships';
import { middleware as csrfMiddleware } from 'lib/csrfToken';

import { AxiosError } from 'axios';
import { apiHandler, AuthenticatedNextApiHandler } from 'lib/apiHandler';

const endpoint: AuthenticatedNextApiHandler = async (req, res) => {
  switch (req.method) {
    case 'DELETE':
      try {
        await removeRelationship(req.query.id as string);
        res.status(StatusCodes.OK).end();
      } catch (error) {
        console.error(
          'Relationship get error:',
          (error as AxiosError)?.response?.data
        );
        (error as AxiosError)?.response?.status === StatusCodes.NOT_FOUND
          ? res.status(StatusCodes.NOT_FOUND).json({
              message: `Relationship not found with ID: ${req.query.id}.`,
            })
          : res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
              message: `Unable to remove the relationship with ID: ${req.query.id}.`,
            });
      }
      break;

    default:
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Invalid request method' });
  }
};

export default apiHandler(csrfMiddleware(endpoint));
