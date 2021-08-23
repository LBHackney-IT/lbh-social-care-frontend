import forms from 'data/flexibleForms';
import { NextApiRequest, NextApiResponse } from 'next';
import StatusCodes from 'http-status-codes';
import { startSubmission, getInProgressSubmissions } from 'lib/submissions';
import { isAuthorised } from 'utils/auth';
import { mapFormIdToFormDefinition } from 'data/flexibleForms/mapFormIdsToFormDefinition';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const user = isAuthorised(req);
  switch (req.method) {
    case 'POST':
      {
        const { formId, socialCareId } = req.body;
        const submission = await startSubmission(
          formId,
          socialCareId,
          String(user?.email)
        );
        res.json(submission);
      }
      break;
    case 'GET':
      if (req.query.includeSubmissions) {
        const submissions = await getInProgressSubmissions(
          user?.permissionFlag
        );
        res.json({
          forms,
          submissions: submissions.map((sub) => ({
            ...sub,
            form: mapFormIdToFormDefinition[sub.formId].form,
          })),
        });
      } else {
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
