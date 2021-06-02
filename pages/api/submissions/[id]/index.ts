import { NextApiRequest, NextApiResponse } from 'next';
import forms from 'data/flexibleForms/forms';
import { Submission } from 'data/flexibleForms/forms.types';
import { getResident } from 'lib/residents';
import { isAuthorised } from 'utils/auth';
import { getPermissionFlag } from 'utils/user';
import { getSubmissionById } from 'lib/submissions';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  let permissionFlag;
  const user = isAuthorised(req);
  if (user) permissionFlag = getPermissionFlag(user);

  const { id } = req.query;

  const submission = await getSubmissionById(id as string);

  const person = await getResident(submission.socialCareId, {
    context_flag: permissionFlag,
  });

  const form = forms.find((form) => form.id === submission.formId);

  res.json({
    ...submission,
    person,
    form,
  });
};

export default handler;
