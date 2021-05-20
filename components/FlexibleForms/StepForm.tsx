import { Formik, Form } from 'formik';
import { Field } from 'data/flexibleForms/forms.types';
import { generateFlexibleSchema } from 'lib/validators';
import FlexibleField from './FlexibleFields';
import { Resident } from 'types';
import Banner from './Banner';
import { generateInitialValues } from 'lib/utils';
import { useRouter } from 'next/router';

type InitialValue = string | string[];

interface Props {
  fields: Field[];
  person: Resident;
  initialValues?: InitialValue[];
  onFinish: (values, any) => void;
  onSubmit: (values, any) => void;
  singleStep?: boolean;
}

const StepForm = ({
  initialValues,
  fields,
  person,
  onSubmit,
  onFinish,
  singleStep,
}: Props): React.ReactElement => {
  const router = useRouter();

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
        setSubmitting,
        touched,
        errors,
        setStatus,
        status,
        submitForm,
        isValid,
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

          <button
            className="govuk-button lbh-button"
            disabled={isSubmitting}
            onClick={async () => {
              await submitForm();
              // next, finish the submission if it's the only step, or return to the task list
              if (isValid) {
                if (singleStep) {
                  setSubmitting(true);
                  onFinish(values, { setStatus });
                } else {
                  if (!isSubmitting)
                    router.push(`/submissions/${router.query.id}`);
                }
              }
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
