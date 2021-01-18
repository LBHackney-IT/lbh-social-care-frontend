import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import LinkButton from 'components/LinkButton/LinkButton';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { useAuth } from 'components/UserContext/UserContext';
import { Select } from 'components/Form';
import { getUserType } from 'utils/user';
import { getResident } from 'utils/api/residents';
import { populateChildForm } from 'utils/populate';
import ADULT_CATE from 'data/googleForms/adultCategories';
import ADULT_FORMS from 'data/googleForms/adultForms';
import CHILD_CATE from 'data/googleForms/childCategories';
import CHILD_FORMS from 'data/googleForms/childForms';

const AddForm = ({ id }) => {
  const { user } = useAuth();
  const [person, setPerson] = useState();
  const [error, setError] = useState();
  const [url, setUrl] = useState();
  const [categoryValue, setCategoryValue] = useState();
  const category = getUserType(user) === 'Children' ? CHILD_CATE : ADULT_CATE;
  const forms = getUserType(user) === 'Children' ? CHILD_FORMS : ADULT_FORMS;

  const getPerson = async () => {
    try {
      const data = await getResident(id);
      setPerson(data);
      setError(false);
    } catch (e) {
      setPerson(null);
      setError(true);
    }
  };
  useEffect(() => {
    getPerson();
  }, []);
  return (
    <>
      {error && <ErrorMessage />}
      {person && (
        <>
          <div>
            <Select
              style={{ display: ' inline-block' }}
              name="category"
              options={category}
              label="Choose a form category"
              placeHolder="Choose one"
              onChange={(value) => setCategoryValue(value)}
            />
            <Select
              style={{ display: ' inline-block', marginLeft: '40px' }}
              name="formList"
              options={forms.filter((form) => form.category === categoryValue)}
              label="Choose a form"
              placeHolder="Choose one"
              onChange={(value) => setUrl(value)}
            />
          </div>
          <LinkButton
            label="Load form"
            route={
              getUserType(user) === 'Children'
                ? `${url}${populateChildForm(
                    person.firstName,
                    person.lastName,
                    person.mosaicId,
                    user.name,
                    url
                  )}`
                : url
            }
            internalQuery={`?id=${id}`}
          />
        </>
      )}
    </>
  );
};

AddForm.propTypes = {
  id: PropTypes.string.isRequired,
};

export default AddForm;
