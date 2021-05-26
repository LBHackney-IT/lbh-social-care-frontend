import React, { useCallback, ReactElement } from 'react';
import { useRouter } from 'next/router';

import PersonView from 'components/PersonView/PersonView';
import { useAuth } from 'components/UserContext/UserContext';
import FormWizard from 'components/FormWizard/FormWizard';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import Seo from 'components/Layout/Seo/Seo';
// import { addCase } from 'utils/api/cases';

import formSteps from 'data/forms/asc-conversation-3';

import type { User, Resident } from 'types';

type FormData = Resident & User & Record<string, unknown>;

const CaseNotesRecording = (): ReactElement => {
  const { query } = useRouter();
  const { user } = useAuth() as { user: User };
  const onFormSubmit = useCallback(
    (person: Resident) => {
      // (person) => async (formData: FormData) => {
      //   await addCase({
      //     personId: person.id,
      //     firstName: person.firstName,
      //     lastName: person.lastName,
      //     contextFlag: person.contextFlag,
      //     dateOfBirth: person.dateOfBirth,
      //     dateOfEvent: new Date().toISOString(),
      //     workerEmail: user.email,
      //     formNameOverall: 'ASC_conv3',
      //     formName: 'ASC Conversation 3',
      //     caseFormData: JSON.stringify(formData),
      //   });
      // },
    },
    [user.email]
  );
  return (
    <>
      <Seo title="Case note" />
      <>
        <h1 className="govuk-fieldset__legend--l gov-weight-lighter">
          Conversation 3
        </h1>
        <PersonView personId={Number(query.id as string)} expandView>
          {(person) =>
            person.contextFlag === 'A' ? (
              <FormWizard
                formPath={`/people/${query.id}/records/conversation-3/`}
                formSteps={formSteps}
                title="Case Notes Recording"
                onFormSubmit={() => onFormSubmit(person)}
                personDetails={{ ...person }}
                includesDetails
                hideBackButton
              />
            ) : (
              <ErrorMessage label="This is only for Adults" />
            )
          }
        </PersonView>
      </>
    </>
  );
};

CaseNotesRecording.goBackButton = true;

export default CaseNotesRecording;
