import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import LinkButton from 'components/LinkButton/LinkButton';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import Spinner from 'components/Spinner/Spinner';
import { useAuth } from 'components/UserContext/UserContext';
import { Select } from 'components/Form';
import { getResident } from 'utils/api/residents';
import { populateChildForm } from 'utils/populate';
import ADULT_CATE from 'data/googleForms/adultCategories';
import ADULT_FORMS from 'data/googleForms/adultForms';
import CHILD_CATE from 'data/googleForms/childCategories';
import CHILD_FORMS from 'data/googleForms/childForms';

const AddForm = ({ id }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState();
  const [error, setError] = useState();
  const [url, setUrl] = useState();
  const [categoryValue, setCategoryValue] = useState();
  const ageContext = person && person.ageContext;
  const category = ageContext === 'C' ? CHILD_CATE : ADULT_CATE;
  const forms = ageContext === 'C' ? CHILD_FORMS : ADULT_FORMS;

  const getPerson = async () => {
    try {
      const data = await getResident(id);
      setPerson(data);
      setLoading(false);
      setError(false);
    } catch (e) {
      setPerson(null);
      setLoading(false);
      setError(true);
    }
  };
  useEffect(() => {
    getPerson();
  }, []);

  if (loading) {
    return <Spinner />;
  }
  return (
    <>
      {error && <ErrorMessage />}
      {person && (
        <>
          <div className={cx('govuk-grid-row')}>
            <Select
              govGrid="one-half"
              name="category"
              options={category}
              label="Choose a form category"
              placeHolder="Choose one"
              onChange={(value) => setCategoryValue(value)}
            />
            {categoryValue && (
              <Select
                govGrid="one-half"
                name="formList"
                options={forms.filter(
                  (form) => form.category === categoryValue
                )}
                label="Choose a form"
                placeHolder="Choose one"
                onChange={(value) => setUrl(value)}
              />
            )}
          </div>
          {url && (
            <LinkButton
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
              internalQuery={`?id=${id}`}
            />
          )}
        </>
      )}
    </>
  );
};

AddForm.propTypes = {
  id: PropTypes.string.isRequired,
};

export default AddForm;
