import { useRouter } from 'next/router';
import PersonView from 'components/PersonView/PersonView';
import FormWizard from 'components/FormWizard/FormWizard';
import { generateInitialValues } from 'lib/utils';
import { generateFlexibleSchema } from 'lib/validators';
import React from 'react';
import { Form, Formik, FormikHelpers, FormikValues } from 'formik';
import CASE_STATUS from 'data/flexibleForms/caseStatus';
import Banner from 'components/FlexibleForms/Banner';
import FlexibleField from 'components/FlexibleForms/FlexibleFields';

const AddNewCaseStatus = (): React.ReactElement => {
  const { query } = useRouter();
  const personId = Number(query.id as string);
  const fields = CASE_STATUS.steps[0].fields;
  const handleSubmit = async (
    values: FormikValues,
    { setStatus }: FormikHelpers<FormikValues>
  ) => {
    try {
    } catch (e) {
      setStatus(e.toString());
    }
  };

  return (
    <>
      <h1 className="govuk-fieldset__legend--l gov-weight-lighter">
        Add a flag
      </h1>
      <Formik
        initialValues={generateInitialValues(fields)}
        validationSchema={generateFlexibleSchema(fields)}
        onSubmit={handleSubmit}
      >
        {({ touched, errors, values, isSubmitting, status, isValid }) => (
          <Form>
            {status && (
              <Banner
                title="There was a problem finishing the submission"
                className="lbh-page-announcement--warning"
              >
                <p>Please refresh the page or try again later.</p>
                <p className="lbh-body-xs">{status}</p>
              </Banner>
            )}

            {fields.map((field) => (
              <FlexibleField
                key={field.id}
                field={field}
                values={values}
                errors={errors}
                touched={touched}
              />
            ))}

            <button className="govuk-button lbh-button" disabled={isSubmitting}>
              Save and finish
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AddNewCaseStatus;
function setFinished(arg0: boolean): void {
  throw new Error('Function not implemented.');
}
