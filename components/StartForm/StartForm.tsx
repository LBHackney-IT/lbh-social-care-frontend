import { useCallback } from 'react';
import { Formik, Form } from 'formik';
import { startSchema } from 'lib/validators';
import { Form as FormType } from 'data/flexibleForms/forms.types';
import TextField from '../FlexibleForms/TextField';
import SelectField from '../FlexibleForms/SelectField';
import Banner from '../FlexibleForms/Banner';
import { useRouter } from 'next/router';
import { FormikHelpers } from 'formik';

export interface FormValues {
  socialCareId: string;
  formId: string;
}

interface Props {
  forms: FormType[];
  onSubmit: (
    values: FormValues,
    { setStatus }: FormikHelpers<FormValues>
  ) => void;
}

const StartForm = ({ forms, onSubmit }: Props): React.ReactElement => {
  const { query } = useRouter();

  const choices = useCallback(
    () =>
      forms.map((form) => ({
        value: form.id,
        label: form.name,
      })),
    [forms]
  )();

  return (
    <Formik
      initialValues={{
        socialCareId: (query.social_care_id as string) || '',
        formId: choices[0].value,
      }}
      validationSchema={startSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, touched, errors, status }) => (
        <Form>
          {status && (
            <Banner
              title="There was a problem submitting the form"
              className="lbh-page-announcement--warning"
            >
              <p>Please refresh the page or try again later.</p>
              <p className="lbh-body-xs">{status}</p>
            </Banner>
          )}

          {!query.social_care_id && (
            <TextField
              name="socialCareId"
              label="Social care ID"
              hint="For example, 12345678"
              touched={touched}
              errors={errors}
              className="govuk-input--width-10"
            />
          )}

          <SelectField
            name="formId"
            label="What do you want to start?"
            touched={touched}
            errors={errors}
            choices={choices}
          />

          <button className="govuk-button lbh-button" disabled={isSubmitting}>
            Continue
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default StartForm;
