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
    case 'POST':
      {
        const user = isAuthorised(req);
        const submission = await finishSubmission(
          id as string,
          user?.email ?? ''
        );
        if (req.body.approverEmail)
          await notifyApprover(
            submission,
            req.body.approverEmail,
            req.headers.host ?? ''
          );
        res.status(StatusCodes.CREATED).json(submission);
      }
      break;
    case 'PATCH':
      {
        const user = isAuthorised(req);
        const submission = await patchResidents(
          id as string,
          user?.email ?? '',
          req.body.residents
        );

        res.status(StatusCodes.ACCEPTED).json(submission);
      }
      break;
    case 'DELETE':
      {
        const user = isAuthorised(req);
        const status = await discardSubmission(id as string, user?.email ?? '');

        res.status(status).end();
      }
      break;
    case 'GET':
      {
        const submission = await getSubmissionById(id as string);
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
