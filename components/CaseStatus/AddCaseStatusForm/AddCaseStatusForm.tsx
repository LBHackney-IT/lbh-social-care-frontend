import { Form, Formik, FormikHelpers, FormikValues } from 'formik';
import CASE_STATUS from 'data/flexibleForms/caseStatus';
import { generateInitialValues } from 'lib/utils';
import { generateFlexibleSchema } from 'lib/validators';
import FlexibleField from 'components/FlexibleForms/FlexibleFields';
import Button from 'components/Button/Button';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useFormValues } from 'utils/api/caseStatus';
import { Choice, Field } from 'data/flexibleForms/forms.types';

const AddCaseStatusForm: React.FC<{
  personId: number;
  prefilledFields: any;
}> = ({ personId, prefilledFields }) => {
  const router = useRouter();

  const form_fields = [...CASE_STATUS.steps[0].fields];
  const { data: CpCaseStatusFields } = useFormValues('CP');

  form_fields.map((field) => {
    if (prefilledFields && prefilledFields[field.id]) {
      field.default = String(prefilledFields[field.id]);
    }
  });

  if (CpCaseStatusFields) {
    CpCaseStatusFields.fields.map((field) => {
      const choices: Choice[] = [];
      field.options.map((option: any) => {
        choices.push({
          value: option.name,
          label: option.description,
        });
      });

      const cpFieldObj: Field = {
        id: field.name,
        question: field.description,
        type: 'radios',
        required: true,
        conditions: [
          {
            id: 'type',
            value: 'CP',
          },
        ],
        choices: choices,
      };

      form_fields.push(cpFieldObj);
    });
  }

  const handleSubmit = async (
    values: FormikValues,
    { setStatus }: FormikHelpers<FormikValues>
  ) => {
    try {
      router.push({
        pathname: `/people/${personId}/case-status/add/review`,
        query: {
          personId: personId,
          ...values,
        },
      });
    } catch (e: any) {
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
              label="Continue"
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
