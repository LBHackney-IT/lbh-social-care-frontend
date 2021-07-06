import { NextApiRequest, NextApiResponse } from 'next';
import forms from 'data/flexibleForms';
import StatusCodes from 'http-status-codes';
import {
  getSubmissionById,
  finishSubmission,
  discardSubmission,
} from 'lib/submissions';
import { isAuthorised } from 'utils/auth';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { id } = req.query;

  switch (req.method) {
    case 'POST':
      {
        const user = isAuthorised(req);
        const status = await finishSubmission(String(id), String(user?.email));

        res.status(status).end();
      }
      break;
    case 'DELETE':
      {
        const user = isAuthorised(req);
        const status = await discardSubmission(String(id), String(user?.email));

        res.status(status).end();
      }
      break;
    case 'GET':
      {
        const submission = await getSubmissionById(String(id));
        const form = forms.find((form) => form.id === submission.formId);

        res.json({
          ...submission,
          form,
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
