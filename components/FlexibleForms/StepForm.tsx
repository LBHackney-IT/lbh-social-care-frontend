import { useState, useEffect } from 'react';
import { Formik, Form, FormikValues, FormikHelpers } from 'formik';
import { Field } from 'data/flexibleForms/forms.types';
import { generateFlexibleSchema } from 'lib/validators';
import FlexibleField from './FlexibleFields';
import { Resident } from 'types';
import Banner from './Banner';
import { generateInitialValues, InitialValues } from 'lib/utils';
import { useAutosave, AutosaveTrigger } from 'contexts/autosaveContext';
import { useRouter } from 'next/router';

interface Props {
  fields: Field[];
  person?: Resident;
  initialValues?: InitialValues;
  onFinish: (
    values: FormikValues,
    setStatus: (message: string) => void
  ) => void;
  onSubmit: (
    values: FormikValues,
    { setStatus }: FormikHelpers<FormikValues>
  ) => void;
  singleStep?: boolean;
}

const StepForm = ({
  initialValues,
  fields,
  person,
  onSubmit,
}: Props): React.ReactElement => (
  <Formik
    initialValues={initialValues || generateInitialValues(fields, person)}
    validationSchema={generateFlexibleSchema(fields)}
    onSubmit={onSubmit}
    validateOnMount={true}
  >
    {(formikProps) => <StepFormInner {...formikProps} fields={fields} />}
  </Formik>
);

interface InnerProps {
  fields: Field[];
  touched;
  errors;
  values;
  isValid: boolean;
  isSubmitting: boolean;
  submitForm;
  status;
}

const StepFormInner = ({
  fields,
  touched,
  errors,
  values,
  isValid,
  isSubmitting,
  submitForm,
  status,
}: InnerProps) => {
  const [goBackToTaskList, setGoBackToTaskList] = useState<boolean>(false);
  const { saved, setSaved } = useAutosave();
  const router = useRouter();

  useEffect(() => {
    if (goBackToTaskList && saved && isValid) {
      router.push(`/submissions/${router.query.id}`);
    }
  }, [goBackToTaskList, isValid, saved, router]);

  return (
    <Form>
      {status && (
        <Banner
          title="There was a problem saving your answers"
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
          touched={touched}
          errors={errors}
          values={values}
        />
      ))}

      <AutosaveTrigger delay={20000000} />

      <button
        className="govuk-button lbh-button"
        disabled={isSubmitting}
        onClick={async () => {
          await submitForm();
          setGoBackToTaskList(true);
          setSaved(true);
        }}
      >
        Save and continue
      </button>
    </Form>
  );
};

export default StepForm;
