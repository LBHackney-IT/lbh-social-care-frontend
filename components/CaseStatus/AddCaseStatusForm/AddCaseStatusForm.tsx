import { Form, Formik, FormikHelpers, FormikValues } from 'formik';
import CASE_STATUS from 'data/flexibleForms/caseStatus/caseStatus';
import { generateInitialValues } from 'lib/utils';
import { generateFlexibleSchema } from 'lib/validators';
import FlexibleField from 'components/FlexibleForms/FlexibleFields';
import Button from 'components/Button/Button';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCaseStatuses } from 'utils/api/caseStatus';
import { format } from 'date-fns';
import { getLatestEndedStatusEndDate } from '../caseStatusHelper';
import { useAuth } from 'components/UserContext/UserContext';
import { User } from 'types';

const AddCaseStatusForm: React.FC<{
  personId: number;
  prefilledFields: any;
}> = ({ personId, prefilledFields }) => {
  const router = useRouter();
  const { user } = useAuth() as { user: User };
  const { data } = useCaseStatuses(personId, 'true');

  const latestEndedStatusEndDate = getLatestEndedStatusEndDate(data);

  const form_fields = CASE_STATUS.steps[0].fields;

  const choices = [
    {
      value: 'CIN',
      label: 'Child in need',
    },
  ];
  user.isInSafeguardingReviewing
    ? choices.push({
        value: 'CP',
        label: 'Child protection',
      })
    : null;

  user.isInPlacementManagementUnit
    ? choices.push({
        value: 'LAC',
        label: 'Looked after child',
      })
    : null;

  form_fields.map((field) => {
    if (prefilledFields && prefilledFields[field.id]) {
      field.default = String(prefilledFields[field.id]);
    }
    if (
      field.id === 'startDate' &&
      latestEndedStatusEndDate &&
      latestEndedStatusEndDate !== 'undefined'
    ) {
      field.startDate = format(
        new Date(latestEndedStatusEndDate),
        'yyyy-MM-dd'
      );
    }

    if (field.id === 'type') {
      field.choices = choices;
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
      setStatus((e as Error).toString());
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
