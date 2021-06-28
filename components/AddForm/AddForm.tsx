import React, { useState } from 'react';

import Button from 'components/Button/Button';
import { useAuth } from 'components/UserContext/UserContext';
import { Autocomplete } from 'components/Form/Autocomplete/Autocomplete';
import { populateChildForm } from 'utils/populate';
import ADULT_FORMS from 'data/googleForms/adultForms';
import CHILD_FORMS from 'data/googleForms/childForms';
import flexibleForms from 'data/flexibleForms';
import { Resident, User } from 'types';

const AddForm = ({ person }: { person: Resident }): React.ReactElement => {
  const { user } = useAuth() as { user: User };
  const [url, setUrl] = useState<string>();
  const ageContext = person && person.contextFlag;
  const forms = ageContext === 'C' ? CHILD_FORMS : ADULT_FORMS;

  let internalForms = [
    ageContext === 'A' && {
      text: 'Case Note Recording',
      value: `/people/${person.id}/records/case-notes-recording`,
    },
    {
      text: 'Warning Note',
      value: `/people/${person.id}/warning-notes/add`,
    },
  ].filter(Boolean) as {
    text: string;
    value: string;
  }[];

  // handle new flexible forms
  if (ageContext === 'A') {
    internalForms = internalForms.concat(
      flexibleForms.map((form) => ({
        text: form.name,
        value: `/submissions/new?social_care_id=${person.id}&form_id=${form.id}`,
      }))
    );
  }

  return (
    <>
      <div className="lbh-form-group govuk-form-group">
        <Autocomplete
          name="formList"
          options={[...internalForms, ...forms]}
          label="Choose a form"
          placeholder="Select or type form name"
          onChange={(value) => setUrl(value as string)}
        />
      </div>
      <Button
        label="Load form"
        route={
          ageContext === 'C'
            ? `${url}${populateChildForm(
                person.firstName,
                person.lastName,
                person.id,
                user.name,
                url
              )}`
            : url
        }
        internalQuery={
          url?.includes('/submissions/new?') ? '' : `?id=${person.id}`
        }
      />
    </>
  );
};

export default AddForm;
