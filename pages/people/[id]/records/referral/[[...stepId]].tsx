import React, { useCallback, ReactElement } from 'react';
import { useRouter } from 'next/router';

import PersonView from 'components/PersonView/PersonView';
import { useAuth } from 'components/UserContext/UserContext';
import FormWizard from 'components/FormWizard/FormWizard';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import Seo from 'components/Layout/Seo/Seo';
// import { addCase } from 'utils/api/cases';

import formSteps from 'data/forms/asc-referral';

import type { User, Resident } from 'types';

type FormData = Resident & User & Record<string, unknown>;

const Referral = (): ReactElement => {
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
        form_name: 'ASC_referral',
        ...formData,
      }),
    [user.email]
  );
  return (
    <>
      <Seo title="Referral" />
      <>
        <h1 className="govuk-fieldset__legend--l gov-weight-lighter">
          Add referral and screening details
        </h1>
        <PersonView personId={Number(query.id as string)} expandView>
          {(person) =>
            person.contextFlag === 'A' ? (
              <FormWizard
                formPath={`/people/${query.id}/records/referral/`}
                formSteps={formSteps}
                title="Referral"
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

Referral.goBackButton = true;

export default Referral;
