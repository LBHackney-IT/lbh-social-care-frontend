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

const ContinueHandler = ({
  goBackToTaskList,
  isValid,
  saved,
}: {
  goBackToTaskList: boolean;
  isValid: boolean;
  saved: boolean;
}): null => {
  const router = useRouter();
  useEffect(() => {
    if (goBackToTaskList && saved && isValid) {
      router.push(`/submissions/${router.query.id}`);
    }
  }, [goBackToTaskList, isValid, saved, router]);
  return null;
};

const StepForm = ({
  initialValues,
  fields,
  person,
  onSubmit,
  // onFinish,
  singleStep,
}: Props): React.ReactElement => {
  const [goBackToTaskList, setGoBackToTaskList] = useState<boolean>(false);
  const { saved, setSaved } = useAutosave();

  return (
    <Formik
      initialValues={initialValues || generateInitialValues(fields, person)}
      validationSchema={generateFlexibleSchema(fields)}
      onSubmit={onSubmit}
      validateOnMount={true}
    >
      {({
        values,
        isSubmitting,
        touched,
        errors,
        status,
        submitForm,
        // setSubmitting,
        isValid,
        // setStatus,
      }) => (
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

          <AutosaveTrigger delay={2000} />

          <ContinueHandler
            saved={saved}
            goBackToTaskList={goBackToTaskList}
            isValid={isValid}
          />

          <button
            className="govuk-button lbh-button"
            disabled={isSubmitting}
            onClick={async () => {
              await submitForm();
              setGoBackToTaskList(true);
              setSaved(true);
            }}
          >
            {singleStep ? 'Save and finish' : 'Save and continue'}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default StepForm;
