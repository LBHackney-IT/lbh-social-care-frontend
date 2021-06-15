import forms from 'data/flexibleForms';
import { NextApiRequest, NextApiResponse } from 'next';
import StatusCodes from 'http-status-codes';
import { startSubmission } from 'lib/submissions';
import { isAuthorised } from 'utils/auth';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  switch (req.method) {
    case 'POST':
      {
        const { formId, socialCareId } = req.body;

        const user = isAuthorised(req);

        const submission = await startSubmission(
          formId,
          socialCareId,
          String(user?.email)
        );

        res.json(submission);
      }
      break;
    case 'GET':
      {
        res.json({
          forms,
        });
      }
      break;
    default:
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Invalid request method' });
      break;
  }
};

export default handler;
