import { useRouter } from 'next/router';
import { generateInitialValues } from 'lib/utils';
import { generateFlexibleSchema } from 'lib/validators';
import React from 'react';
import { Form, Formik, FormikHelpers, FormikValues } from 'formik';
import CASE_STATUS from 'data/flexibleForms/caseStatus';
import Banner from 'components/FlexibleForms/Banner';
import FlexibleField from 'components/FlexibleForms/FlexibleFields';
import { GetFormValues } from 'utils/api/caseStatus';
import PersonWidget from 'components/PersonWidget/PersonWidget';
import RevisionTimeline from 'components/RevisionTimeline/MiniRevisionTimeline';
import { Submission } from 'data/flexibleForms/forms.types';
import { Resident, User } from 'types';
import residents from 'pages/api/residents';
import PersonView from 'components/PersonView/PersonView';

interface Props {
  submission: Submission;
  person: Resident;
  user: User;
}

const AddNewCaseStatus = (): React.ReactElement => {
  const { query } = useRouter();
  const personId = Number(query.id as string);
  const fields = CASE_STATUS.steps[0].fields;
  const { data: { fields: caseStatuses } = {} } = GetFormValues('CIN');
  if (caseStatuses) {
    const stepArray: any = [];
    caseStatuses[0].options.map((step) => {
      let stepObject = {
        value: step.name,
        label: step.name + ' ' + step.description,
      };
      stepArray.push(stepObject);
    });
    CASE_STATUS.steps[0].fields.map((field) => {
      if (field.id === 'reasonForPlacement') {
        field.choices = stepArray;
      }
    });
  }
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
      <PersonView personId={personId} expandView />

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
