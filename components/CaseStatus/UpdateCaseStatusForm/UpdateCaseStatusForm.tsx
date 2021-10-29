import { Form, Formik, FormikHelpers, FormikValues } from 'formik';
import CASE_STATUS_LAC_UPDATE from 'data/flexibleForms/caseStatus/updateLAC';
import { generateInitialValues } from 'lib/utils';
import { generateFlexibleSchema } from 'lib/validators';
import FlexibleField from 'components/FlexibleForms/FlexibleFields';
import Button from 'components/Button/Button';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { format } from 'date-fns';

const UpdateCaseStatusForm: React.FC<{
  personId: number;
  caseStatusId: number;
  prefilledFields: any;
  caseStatusType: string;
  action: string;
  currentCaseStatusStartDate?: string;
}> = ({
  personId,
  caseStatusId,
  caseStatusType,
  prefilledFields,
  action,
  currentCaseStatusStartDate,
}) => {
  const router = useRouter();

  const form_fields = CASE_STATUS_LAC_UPDATE.steps[0].fields;

  if (
    currentCaseStatusStartDate &&
    currentCaseStatusStartDate !== 'undefined'
  ) {
    const activeCaseStatusStartDate: Date = new Date(
      currentCaseStatusStartDate
    );
    const currentStartDateValidation: Date = new Date();
    currentStartDateValidation.setDate(activeCaseStatusStartDate.getDate() + 1);

    if (currentCaseStatusStartDate) {
      form_fields.map((field: any) => {
        if (field.id === 'startDate') {
          field.startDate = format(
            new Date(currentStartDateValidation),
            'yyyy-MM-dd'
          );
        }
      });
    }
  } else {
    form_fields.map((field: any) => {
      if (
        field.id === 'startDate' &&
        prefilledFields &&
        prefilledFields.startDate
      ) {
        field.startDate = format(
          new Date(prefilledFields.startDate),
          'yyyy-MM-dd'
        );
      }
    });
  }

  if (prefilledFields && prefilledFields['action']) {
    action = prefilledFields['action'];
  }

  if (prefilledFields) {
    form_fields.map((field: any) => {
      if (prefilledFields[field.id]) {
        field.default = prefilledFields[field.id];
      }
    });
  }

  const handleSubmit = async (
    values: FormikValues,
    { setStatus }: FormikHelpers<FormikValues>
  ) => {
    try {
      router.push({
        pathname: `/people/${personId}/case-status/${caseStatusId}/update/review`,
        query: {
          action: action,
          type: caseStatusType,
          ...values,
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
              disabled={Object.keys(errors).length > 0}
              type="submit"
              data-testid="submit_button"
              wideButton
            />
            <Link
              href={{
                pathname: `/people/${personId}/case-status/${caseStatusId}/edit`,
                query: {
                  action: action,
                  type: caseStatusType,
                  currentCaseStatusStartDate: currentCaseStatusStartDate,
                },
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

export default UpdateCaseStatusForm;
