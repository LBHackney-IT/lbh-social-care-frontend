import axios from 'axios';
import { Submission, StepAnswers } from 'data/flexibleForms/forms.types';

const { ENDPOINT_API, AWS_KEY } = process.env;

const headersWithKey = {
  'x-api-key': AWS_KEY,
};

export const startSubmission = async (
  formId: string,
  socialCareId: number,
  createdBy: string
): Promise<Submission> => {
  const { data } = await axios.post(
    `${ENDPOINT_API}/submissions`,
    {
      formId,
      socialCareId: Number(socialCareId),
      createdBy,
    },
    {
      headers: headersWithKey,
    }
  );

  return data;
};

export const getSubmissionById = async (
  submissionId: string
): Promise<Submission> => {
  const { data } = await axios.get(
    `${ENDPOINT_API}/submissions/${submissionId}`,
    {
      headers: headersWithKey,
    }
  );
  return {
    formAnswers: data?.formAnswers && JSON.parse(data.formAnswers),
    ...data,
  };
};

export const patchSubmissionForStep = async (
  submissionId: string,
  stepId: string,
  editedBy: string,
  stepAnswers: StepAnswers
): Promise<Submission> => {
  const { data } = await axios.patch(
    `${ENDPOINT_API}/submissions/${submissionId}/steps/${stepId}`,
    {
      stepAnswers: JSON.stringify(stepAnswers),
      editedBy,
    },
    {
      headers: headersWithKey,
    }
  );
  return data;
};

export const finishSubmission = async (
  submissionId: string
): Promise<Submission> => {
  const { data } = await axios.patch(
    `${ENDPOINT_API}/submissions/${submissionId}`,
    {
      submittedAt: new Date().toISOString(),
    },
    {
      headers: headersWithKey,
    }
  );
  return data;
};
