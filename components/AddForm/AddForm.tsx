import React, { useState } from 'react';

import Button from 'components/Button/Button';
import { useAuth } from 'components/UserContext/UserContext';
import { Autocomplete } from 'components/Form/Autocomplete/Autocomplete';
import { populateChildForm } from 'utils/populate';
import ADULT_FORMS from 'data/googleForms/adultForms';
import CHILD_FORMS from 'data/googleForms/childForms';
import { Resident, User } from 'types';

const AddForm = ({ person }: { person: Resident }): React.ReactElement => {
  const { user } = useAuth() as { user: User };
  const [url, setUrl] = useState<string>();
  const ageContext = person && person.ageContext;
  const forms = ageContext === 'C' ? CHILD_FORMS : ADULT_FORMS;

  return (
    <>
      <div className="govuk-form-group">
        <Autocomplete
          name="formList"
          options={forms}
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
                person.mosaicId,
                user.name,
                url
              )}`
            : url
        }
        internalQuery={`?id=${person.mosaicId}`}
      />
    </>
  );
};

export default AddForm;
