import React, { useCallback, ReactElement } from 'react';
import { useRouter } from 'next/router';

import PersonView from 'components/PersonView/PersonView';
import { useAuth } from 'components/UserContext/UserContext';
import BackButton from 'components/Layout/BackButton/BackButton';
import FormWizard from 'components/FormWizard/FormWizard';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import Seo from 'components/Layout/Seo/Seo';
// import { addCase } from 'utils/api/cases';

import formSteps from 'data/forms/asc-conversation-3';

import type { User, ExtendedResident } from 'types';

type FormData = ExtendedResident & User & Record<string, unknown>;

const CaseNotesRecording = (): ReactElement => {
  const { query } = useRouter();
  const { user } = useAuth() as { user: User };
  const onFormSubmit = useCallback(
    // (person) => async (formData: FormData) =>
    //   await addCase({
    //     mosaic_id: person.mosaicId,
    //     first_name: person.firstName,
    //     last_name: person.lastName,
    //     worker_email: user.email,
    //     form_name: 'ASC_conv1',
    //     ...formData,
    //   }),
    (person) => (formData: FormData) =>
      console.log({
        mosaic_id: person.mosaicId,
        first_name: person.firstName,
        last_name: person.lastName,
        worker_email: user.email,
        form_name: 'ASC_conv3',
        ...formData,
      }),
    [user.email]
  );
  return (
    <>
      <Seo title="Case note" />
      <>
        <BackButton />
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
                onFormSubmit={onFormSubmit(person)}
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

export default CaseNotesRecording;
