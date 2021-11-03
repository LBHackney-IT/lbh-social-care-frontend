import { Form, Formik, FormikHelpers, FormikValues } from 'formik';
import CASE_STATUS from 'data/flexibleForms/caseStatus/caseStatus';
import { generateInitialValues } from 'lib/utils';
import { generateFlexibleSchema } from 'lib/validators';
import FlexibleField from 'components/FlexibleForms/FlexibleFields';
import Button from 'components/Button/Button';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCaseStatusesWithEnded } from 'utils/api/caseStatus';
import { CaseStatus } from 'types';
import { format } from 'date-fns';

const AddCaseStatusForm: React.FC<{
  personId: number;
  prefilledFields: any;
}> = ({ personId, prefilledFields }) => {
  const router = useRouter();

  const { data } = useCaseStatusesWithEnded(
    personId,
    { includeEnded: true },
    true
  );

  const fixedDate = data ? data[0] : undefined;

  const sortCaseStatusByEndDate = (
    caseStatuses: CaseStatus[] | undefined
  ): CaseStatus[] | undefined => {
    console.log('caseStatuses', caseStatuses);
    return caseStatuses === undefined
      ? undefined
      : caseStatuses.sort((a, b) => {
          console.log('enddate', b.endDate);
          return Date.parse(b.endDate) - Date.parse(a.endDate);
        });
  };

  const orderedCaseStatuses = sortCaseStatusByEndDate(data);

  console.log('orderedCaseStatuses', orderedCaseStatuses);
  if (orderedCaseStatuses) {
    console.log('orderedCaseStatuses[0]', orderedCaseStatuses[0]);
  }

  const latestEndDate = orderedCaseStatuses
    ? orderedCaseStatuses[0].endDate
    : undefined;

  console.log('latestEndDate', latestEndDate);

  const form_fields = CASE_STATUS.steps[0].fields;

  form_fields.map((field) => {
    if (prefilledFields && prefilledFields[field.id]) {
      field.default = String(prefilledFields[field.id]);
    }
    if (
      field.id === 'startDate' &&
      latestEndDate &&
      latestEndDate !== 'undefined'
    ) {
      field.startDate = format(new Date(latestEndDate), 'yyyy-MM-dd');
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
