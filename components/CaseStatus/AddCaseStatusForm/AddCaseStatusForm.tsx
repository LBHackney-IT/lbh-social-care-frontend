import { Form, Formik, FormikHelpers, FormikValues } from 'formik';
import CASE_STATUS from 'data/flexibleForms/caseStatus';
import { generateInitialValues } from 'lib/utils';
import { generateFlexibleSchema } from 'lib/validators';
import FlexibleField from 'components/FlexibleForms/FlexibleFields';
import Button from 'components/Button/Button';
import Link from 'next/link';
import { useRouter } from 'next/router';

const AddCaseStatusForm: React.FC<{
  personId: number;
  prefilledField: any;
}> = ({ personId, prefilledField }) => {
  const router = useRouter();
  const form_fields = CASE_STATUS.steps[0].fields;

  form_fields.map((field) => {
    if (prefilledField[field.id]) {
      field.default = String(prefilledField[field.id]);
    }
  });

  const handleSubmit = async (
    values: FormikValues,
    { setStatus }: FormikHelpers<FormikValues>
  ) => {
    try {
      router.push({
        pathname: `/people/${personId}/case-status/add/review`,
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
              data-testid="submit_button"
              wideButton
            />
            <Link href={{ pathname: `/people/${personId}/` }} scroll={false}>
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
  );
};

export default AddCaseStatusForm;
