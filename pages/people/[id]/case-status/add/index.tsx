import React from 'react';
import { useRouter } from 'next/router';
import { Form, Formik, FormikHelpers, FormikValues } from 'formik';
import { generateInitialValues } from 'lib/utils';
import { generateFlexibleSchema } from 'lib/validators';
import CASE_STATUS from 'data/flexibleForms/caseStatus';
import FlexibleField from 'components/FlexibleForms/FlexibleFields';
import PersonView from 'components/PersonView/PersonView';
import Button from 'components/Button/Button';
import Link from 'next/link';

const AddNewCaseStatus = (): React.ReactElement => {
  const router = useRouter();
  const personId = Number(router.query.id as string);
  const form_fields = CASE_STATUS.steps[0].fields;

  form_fields.map((field) => {
    if (router.query[field.id]) {
      field.default = String(router.query[field.id]);
    }
  });

  const handleSubmit = async (
    values: FormikValues,
    { setStatus }: FormikHelpers<FormikValues>
  ) => {
    try {
      router.push({
        pathname: `/people/${router.query.id}/case-status/add/review`,
        query: {
          personId: personId,
          type: values.type,
          startDate: values.startDate,
          notes: values.notes,
        },
      });
    } catch (e) {
      setStatus(e.toString());
    }
  };

  return (
    <>
      <h1 className="govuk-fieldset__legend--l gov-weight-lighter">
        Add a case status
      </h1>
      <PersonView personId={personId} expandView>
        <Formik
          initialValues={generateInitialValues(form_fields)}
          validationSchema={generateFlexibleSchema(form_fields)}
          onSubmit={handleSubmit}
        >
          {({ touched, errors, values }) => (
            <Form>
              {form_fields.map((field) => (
                <FlexibleField
                  key={field.id}
                  field={field}
                  values={values}
                  errors={errors}
                  touched={touched}
                />
              ))}

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Button
                  label="Submit"
                  disabled={values.type == '' || Object.keys(errors).length > 0}
                  type="submit"
                  wideButton
                />
                <Link
                  href={{ pathname: `/people/${router.query.id}/` }}
                  scroll={false}
                >
                  <a
                    className={`lbh-link lbh-link--no-visited-state govuk-!-margin-left-3`}
                  >
                    Cancel
                  </a>
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </PersonView>
    </>
  );
};

export default AddNewCaseStatus;
