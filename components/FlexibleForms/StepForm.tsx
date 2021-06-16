import { Formik, Form, FormikValues, FormikHelpers } from 'formik';
import { Field } from 'data/flexibleForms/forms.types';
import { generateFlexibleSchema } from 'lib/validators';
import FlexibleField from './FlexibleFields';
import { Resident } from 'types';
import Banner from './Banner';
import { generateInitialValues, InitialValues } from 'lib/utils';
import { AutosaveTrigger } from 'contexts/autosaveContext';

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
  singleStep,
}: Props): React.ReactElement => {
  return (
    <Formik
      initialValues={initialValues || generateInitialValues(fields, person)}
      validationSchema={generateFlexibleSchema(fields)}
      onSubmit={onSubmit}
      validateOnMount={true}
    >
      {({ values, isSubmitting, touched, errors, status }) => (
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

          <button className="govuk-button lbh-button" disabled={isSubmitting}>
            {singleStep ? 'Save and finish' : 'Save and continue'}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default StepForm;
