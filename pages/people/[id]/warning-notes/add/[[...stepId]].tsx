import { useCallback } from 'react';
import { useRouter } from 'next/router';

import Seo from 'components/Layout/Seo/Seo';
import PersonView from 'components/PersonView/PersonView';
import { useAuth } from 'components/UserContext/UserContext';
import FormWizard from 'components/FormWizard/FormWizard';
import { addWarningNote } from 'utils/api/warningNotes';
import PersonLinkConfirmation from 'components/Steps/PersonLinkConfirmation';

import { formStepsAdult, formStepsChild } from 'data/forms/warning-note';

import type { Resident, User, WarningNote } from 'types';

interface FormWarningNote extends Omit<WarningNote, 'disclosedWithIndividual'> {
  disclosedWithIndividual: 'Yes' | 'No';
}

const CaseNotesRecording = (): React.ReactElement => {
  const { query } = useRouter();
  const personId = Number(query.id as string);
  const { user } = useAuth() as { user: User };
  const onFormSubmit = useCallback(
    (person: Resident) => async (formData: FormWarningNote) => {
      await addWarningNote({
        personId: person.id,
        firstName: person.firstName,
        lastName: person.lastName,
        ...formData,
        disclosedWithIndividual: formData.disclosedWithIndividual === 'Yes',
        createdBy: user.email,
      });
    },
    [user.email]
  );
  return (
    <>
      <Seo title="Case note" />
      <>
        <h1 className="govuk-fieldset__legend--l gov-weight-lighter">
          Add Warning Note
        </h1>
        <PersonView personId={personId} expandView>
          {(person) => (
            <FormWizard
              formPath={`/people/${personId}/warning-notes/add/`}
              formSteps={
                person.contextFlag === 'A' ? formStepsAdult : formStepsChild
              }
              title="Add Warning Note"
              onFormSubmit={onFormSubmit(person)}
              personDetails={{ ...person }}
              includesDetails
              hideBackButton
              successMessage="Warning note has been added"
              customConfirmation={PersonLinkConfirmation}
            />
          )}
        </PersonView>
      </>
    </>
  );
};

export default CaseNotesRecording;
