import { useState } from 'react';
import PropTypes from 'prop-types';

import Button from 'components/Button/Button';
import { useAuth } from 'components/UserContext/UserContext';
import { Autocomplete } from 'components/Form';
import { populateChildForm } from 'utils/populate';
import ADULT_FORMS from 'data/googleForms/adultForms';
import CHILD_FORMS from 'data/googleForms/childForms';

const AddForm = ({ person }) => {
  const { user } = useAuth();
  const [url, setUrl] = useState();
  const ageContext = person && person.ageContext;
  const forms = ageContext === 'C' ? CHILD_FORMS : ADULT_FORMS;

  return (
    <>
      <div className="govuk-form-group">
        <Autocomplete
          name="formList"
          options={forms}
          label="Choose a form"
          placeHolder="Search or select a form"
          onChange={(value) => setUrl(value)}
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

AddForm.propTypes = {
  person: PropTypes.shape({
    mosaicId: PropTypes.string.isRequired,
    ageContext: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
  }).isRequired,
};

export default AddForm;
