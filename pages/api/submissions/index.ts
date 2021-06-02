import forms from 'data/flexibleForms';
import { NextApiRequest, NextApiResponse } from 'next';
import StatusCodes from 'http-status-codes';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  switch (req.method) {
    case 'POST':
      // TODO: start a new submission here
      // TODO: send back new case object
      res.json({
        id: 1,
      });
      break;
    case 'GET':
      res.json({
        forms,
      });
      break;
    default:
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Invalid request method' });
      break;
  }
};

export default handler;
