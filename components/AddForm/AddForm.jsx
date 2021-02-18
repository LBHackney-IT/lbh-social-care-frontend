import { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Button from 'components/Button/Button';
import { useAuth } from 'components/UserContext/UserContext';
import { Select } from 'components/Form';
import { populateChildForm } from 'utils/populate';
import ADULT_CATE from 'data/googleForms/adultCategories';
import ADULT_FORMS from 'data/googleForms/adultForms';
import CHILD_CATE from 'data/googleForms/childCategories';
import CHILD_FORMS from 'data/googleForms/childForms';

const AddForm = ({ person }) => {
  const { user } = useAuth();
  const [url, setUrl] = useState();
  const [categoryValue, setCategoryValue] = useState();
  const ageContext = person && person.ageContext;
  const category = ageContext === 'C' ? CHILD_CATE : ADULT_CATE;
  const forms = ageContext === 'C' ? CHILD_FORMS : ADULT_FORMS;
  const filteredForms = forms.filter((form) => form.category === categoryValue);
  const isOneFormOnly = filteredForms.length === 1;
  const formURL = isOneFormOnly ? filteredForms[0].value : url;

  return (
    <>
      <div className={cx('govuk-grid-row')}>
        <Select
          govGrid="one-half"
          name="category"
          options={category}
          label="Choose a form category"
          placeHolder="Choose one"
          width={30}
          onChange={(value) => setCategoryValue(value)}
        />
        {categoryValue && (
          <Select
            govGrid="one-half"
            name="formList"
            width={30}
            options={filteredForms}
            label="Choose a form"
            placeHolder="choose one"
            value={isOneFormOnly ? filteredForms[0].value : undefined}
            isUnselectable={!isOneFormOnly}
            onChange={(value) => setUrl(value)}
          />
        )}
      </div>
      {formURL && (
        <Button
          label="Load form"
          route={
            ageContext === 'C'
              ? `${formURL}${populateChildForm(
                  person.firstName,
                  person.lastName,
                  person.mosaicId,
                  user.name,
                  formURL
                )}`
              : formURL
          }
          internalQuery={`?id=${person.mosaicId}`}
        />
      )}
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
