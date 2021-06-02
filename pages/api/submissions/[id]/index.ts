import { NextApiRequest, NextApiResponse } from 'next';
import forms from 'data/flexibleForms';
import { getResident } from 'lib/residents';
import { isAuthorised } from 'utils/auth';
import { getPermissionFlag } from 'utils/user';
import StatusCodes from 'http-status-codes';
import { getSubmissionById, finishSubmission } from 'lib/submissions';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  let permissionFlag;
  const user = isAuthorised(req);
  if (user) permissionFlag = getPermissionFlag(user);

  const { id } = req.query;

  switch (req.method) {
    case 'POST':
      {
        const submission = await finishSubmission(String(id));
        res.json(submission);
      }
      break;
    case 'GET':
      {
        const submission = await getSubmissionById(String(id));

        const person = await getResident(submission.socialCareId, {
          context_flag: permissionFlag,
        });

        const form = forms.find((form) => form.id === submission.formId);

        res.json({
          ...submission,
          person,
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
