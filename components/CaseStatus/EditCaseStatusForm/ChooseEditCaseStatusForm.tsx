import { Form, Formik, FormikHelpers, FormikValues } from 'formik';
import CASE_STATUS from 'data/flexibleForms/caseStatus/chooseEdit';
import { generateInitialValues } from 'lib/utils';
import { generateFlexibleSchema } from 'lib/validators';
import FlexibleField from 'components/FlexibleForms/FlexibleFields';
import Button from 'components/Button/Button';
import Link from 'next/link';
import { useRouter } from 'next/router';

const ChooseEditCaseStatusForm: React.FC<{
  personId: number;
  caseStatusId: number;
  prefilledValue: string;
  caseStatusType: string;
}> = ({ personId, caseStatusId, prefilledValue, caseStatusType }) => {
  const router = useRouter();

  const form_fields = CASE_STATUS.steps[0].fields;

  form_fields.map((field: any) => {
    if (prefilledValue) {
      field.default = String(prefilledValue);
    }
  });

  const handleSubmit = async (
    values: FormikValues,
    { setStatus }: FormikHelpers<FormikValues>
  ) => {
    try {
      router.push({
        pathname: `/people/${personId}/case-status/${caseStatusId}/edit/edit`,
        query: {
          action: values.action,
          type: caseStatusType,
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
          {form_fields.map((field: any) => (
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
              label="Continue"
              disabled={
                !['edit', 'update', 'end'].includes(String(values.action)) ||
                Object.keys(errors).length > 0
              }
              type="submit"
              data-testid="submit_button"
              wideButton
            />
            <Link
              href={{ pathname: `/people/${personId}/details` }}
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
  );
};

export default ChooseEditCaseStatusForm;
