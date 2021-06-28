import axios from 'axios';
import {
  Submission,
  StepAnswers,
  FlexibleAnswers,
} from 'data/flexibleForms/forms.types';
import { Resident, AgeContext } from 'types';

type RawSubmission = Omit<Submission, 'formAnswers'> & {
  formAnswers: {
    [key: string]: string;
  };
};

const { ENDPOINT_API, AWS_KEY } = process.env;

const headersWithKey = {
  'x-api-key': AWS_KEY,
};

/** get a list of all unfinished submissions in the current social care service context  */
export const getUnfinishedSubmissions = async (
  ageContext?: AgeContext
): Promise<Submission[]> => {
  const { data } = await axios.get(`${ENDPOINT_API}/submissions`, {
    headers: headersWithKey,
  });
  return ageContext
    ? data.filter((submission: Submission) =>
        submission.residents.some(
          (resident: Resident) => resident.ageContext === ageContext
        )
      )
    : data;
};

/** create a new submission for the given form, resident and worker  */
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

const deserialiseAnswers = (data: RawSubmission): Submission => {
  const deserialisedAnswers: FlexibleAnswers = {};
  Object.keys(data.formAnswers).map(
    (step) => (deserialisedAnswers[step] = JSON.parse(data.formAnswers[step]))
  );
  return {
    ...data,
    formAnswers: deserialisedAnswers,
  };
};

/** get an existing submission by its id */
export const getSubmissionById = async (
  submissionId: string
): Promise<Submission> => {
  const { data } = await axios.get(
    `${ENDPOINT_API}/submissions/${submissionId}`,
    {
      headers: headersWithKey,
    }
  );
  return deserialiseAnswers(data);
};

/** update the answers for a given step on a submission, providing the submission id, step id, editor's name and the answers to update */
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
  return deserialiseAnswers(data);
};

/** pass in a string of resident ids to replace the existing ones associated with the submission */
export const patchResidents = async (
  submissionId: string,
  residentIds: number[]
): Promise<Submission> => {
  console.log(`UPDATING RESIDENTS:`, residentIds);
  return true;

  // const { data } = await axios.patch(
  //   `${ENDPOINT_API}/submissions/${submissionId}`,
  //   {
  //     residents: residentIds,
  //   },
  //   {
  //     headers: headersWithKey,
  //   }
  // );
  // return data;
};

/** mark an existing submission as finished, providing its id  */
export const finishSubmission = async (
  submissionId: string,
  finishedBy: string
): Promise<number> => {
  const { status } = await axios.patch(
    `${ENDPOINT_API}/submissions/${submissionId}`,
    {
      createdBy: finishedBy,
    },
    {
      headers: headersWithKey,
    }
  );
  return status;
};
