import { NextApiRequest, NextApiResponse } from 'next';
import forms from 'data/flexibleForms/forms';
import { getResident } from 'lib/residents';
import { isAuthorised } from 'utils/auth';
import { getPermissionFlag } from 'utils/user';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  let permissionFlag;
  const user = isAuthorised(req);
  if (user) permissionFlag = getPermissionFlag(user);

  const { id } = req.query;

  // TODO: use a real api call here
  const submission = {
    id: id,
    socialCareId: 1,
    formId: 'conversation-3',
    answers: {},
    completedSteps: [],
    editedBy: [],
    createdBy: 'test.user@hackney.gov.uk',
    createdAt: '2021-05-17T10:48:12.880Z',
    updatedAt: '2021-05-17T10:48:12.892Z',
    submittedAt: null,
    discardedAt: null,
  };

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
