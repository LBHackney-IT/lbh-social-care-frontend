import { Form, Formik, FormikHelpers, FormikValues } from 'formik';
import CASE_STATUS_EDIT from 'data/flexibleForms/caseStatus/editCaseStatus';
import CASE_STATUS_END from 'data/flexibleForms/caseStatus/endCaseStatus';
import { generateInitialValues } from 'lib/utils';
import { generateFlexibleSchema } from 'lib/validators';
import FlexibleField from 'components/FlexibleForms/FlexibleFields';
import Button from 'components/Button/Button';
import Link from 'next/link';
import { useRouter } from 'next/router';

const EditCaseStatusForm: React.FC<{
  personId: number;
  caseStatusId: number;
  prefilledFields: any;
  action: string;
}> = ({ personId, caseStatusId, prefilledFields, action }) => {
  const router = useRouter();

  let form_fields: any;
  if (prefilledFields && prefilledFields['action']) {
    action = prefilledFields['action'];
  }

  action === 'edit'
    ? (form_fields = CASE_STATUS_EDIT.steps[0].fields)
    : (form_fields = CASE_STATUS_END.steps[0].fields);

  form_fields.map((field: any) => {
    if (prefilledFields && prefilledFields[field.id]) {
      field.default = String(prefilledFields[field.id]);
    }
  });

  const handleSubmit = async (
    values: FormikValues,
    { setStatus }: FormikHelpers<FormikValues>
  ) => {
    try {
      let requestObj;
      action === 'edit'
        ? (requestObj = {
            action: action,
            startDate: values.startDate,
            notes: values.notes,
          })
        : (requestObj = {
            action: action,
            endDate: values.endDate,
          });

      router.push({
        pathname: `/people/${personId}/case-status/${caseStatusId}/edit/review`,
        query: requestObj,
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
              disabled={values.endDate == '' || Object.keys(errors).length > 0}
              type="submit"
              data-testid="submit_button"
              wideButton
            />
            <Link
              href={{
                pathname: `/people/${personId}/case-status/${caseStatusId}/edit`,
                query: { action: action },
              }}
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

export default EditCaseStatusForm;
