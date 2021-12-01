import {
  Form,
  Formik,
  FormikHelpers,
  FormikValues,
  useFormikContext,
} from 'formik';
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
// import { useEffect } from 'react';

const AddCaseStatusForm: React.FC<{
  personId: number;
  prefilledFields: any;
}> = ({ personId, prefilledFields }) => {
  const router = useRouter();

  const { data } = useCaseStatuses(personId, 'true');

  let latestEndedStatusEndDate = getLatestEndedStatusEndDate(data);
  console.log('enddate1', latestEndedStatusEndDate);

  const form_fields = CASE_STATUS.steps[0].fields;

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

  const HandleChange = () => {
    const { values }: FormikValues = useFormikContext();
    console.log('CHANGE', values.type);
    if (values && values.type === 'CIN') {
      console.log('IN CIN');
      latestEndedStatusEndDate = '2021-11-28';
    }
    if (values && values.type === 'LAC') {
      console.log('IN LAC');
      latestEndedStatusEndDate = '2021-11-29';
    }
    if (values && values.type === 'CP') {
      console.log('IN CP');
      latestEndedStatusEndDate = '2021-11-30';
    }
    console.log(latestEndedStatusEndDate);

    form_fields.map((field) => {
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
    });
    return null;
  };

  return (
    <Formik
      initialValues={generateInitialValues(form_fields)}
      validationSchema={generateFlexibleSchema(form_fields)}
      onSubmit={handleSubmit}
      // handleChange={HandleChange}
      // onChange={HandleChange}
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
          <HandleChange />
          {console.log('values', values.type)}

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
