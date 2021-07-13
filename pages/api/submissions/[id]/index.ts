import { NextApiRequest, NextApiResponse } from 'next';
import forms from 'data/flexibleForms';
import StatusCodes from 'http-status-codes';
import {
  getSubmissionById,
  finishSubmission,
  patchResidents,
  discardSubmission,
} from 'lib/submissions';
import { isAuthorised } from 'utils/auth';
import { notifyApprover } from 'lib/notify';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { id } = req.query;

  switch (req.method) {
    case 'PATCH':
      {
        const user = isAuthorised(req);
        let submission;
        if (req.body.residents) {
          submission = await patchResidents(
            String(id),
            String(user?.email),
            req.body.residents
          );
        } else {
          submission = await finishSubmission(String(id), String(user?.email));
          await notifyApprover(
            submission,
            req.body.approverEmail,
            String(req.headers.host)
          );
        }
        res.status(StatusCodes.ACCEPTED).json(submission);
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
