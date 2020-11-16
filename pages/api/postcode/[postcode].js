import axios from 'axios';
import * as HttpStatus from 'http-status-codes';

import { isAuthorised } from 'utils/auth';

export default async (req, res) => {
  if (!isAuthorised({ req })) {
    return res.status(HttpStatus.UNAUTHORIZED).send('Auth cookie missing.');
  }
  switch (req.method) {
    case 'GET':
      try {
        const { data } = await axios.get(
          `${process.env.POSTCODE_LOOKUP_URL}${req.query.postcode}`,
          {
            headers: {
              'x-api-key': process.env.POSTCODE_LOOKUP_APIKEY,
            },
          }
        );
        res.status(data.statusCode).json(data.data);
      } catch (e) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).end(e.message);
      }
      break;

    default:
      res.status(HttpStatus.BAD_REQUEST).json('Invalid request method');
  }
};
