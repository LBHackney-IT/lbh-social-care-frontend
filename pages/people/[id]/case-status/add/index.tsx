import React from 'react';
import { useRouter } from 'next/router';
import { Form, Formik, FormikHelpers, FormikValues } from 'formik';
import { generateInitialValues } from 'lib/utils';
import { generateFlexibleSchema } from 'lib/validators';
import CASE_STATUS from 'data/flexibleForms/caseStatus';
import Banner from 'components/FlexibleForms/Banner';
import FlexibleField from 'components/FlexibleForms/FlexibleFields';
import PersonView from 'components/PersonView/PersonView';
import { useAuth } from 'components/UserContext/UserContext';
import { User } from 'types';
import { AddCaseStatus } from 'utils/api/caseStatus';

const AddNewCaseStatus = (): React.ReactElement => {
  const router = useRouter();
  const personId = Number(router.query.id as string);
  const fields = CASE_STATUS.steps[0].fields;

  const { user } = useAuth() as { user: User };

  const handleSubmit = async (
    values: FormikValues,
    { setStatus }: FormikHelpers<FormikValues>
  ) => {
    try {
      const { data, error } = await AddCaseStatus({
        personId: personId,
        type: values.type,
        startDate: values.startDate,
        notes: values.notes,
        createdby: user.email,
      });

      if (error) throw error;

      router.push({
        pathname: `/people/${router.query.id}/details`,
        query: { success: true },
      });
      return data;
    } catch (e) {
      setStatus(e.toString());
    }
  };

  return (
    <>
      <h1 className="govuk-fieldset__legend--l gov-weight-lighter">
        Add a flag
      </h1>
      <PersonView personId={personId} expandView>
        <Formik
          initialValues={generateInitialValues(fields)}
          validationSchema={generateFlexibleSchema(fields)}
          onSubmit={handleSubmit}
        >
          {({ touched, errors, values, isSubmitting, status }) => (
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

              <button
                className="govuk-button lbh-button"
                disabled={isSubmitting}
              >
                Save and finish
              </button>
            </Form>
          )}
        </Formik>
      </PersonView>
    </>
  );
};

export default AddNewCaseStatus;
