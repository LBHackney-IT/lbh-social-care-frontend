import { Form, Formik, FormikHelpers, FormikValues } from 'formik';
import CASE_STATUS_EDIT from 'data/flexibleForms/caseStatus/editCaseStatus';
import CASE_STATUS_END from 'data/flexibleForms/caseStatus/endCaseStatus';
import { generateInitialValues } from 'lib/utils';
import { generateFlexibleSchema } from 'lib/validators';
import FlexibleField from 'components/FlexibleForms/FlexibleFields';
import Button from 'components/Button/Button';
import { CaseStatus } from 'types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCaseStatuses } from 'utils/api/caseStatus';
import { format } from 'date-fns';
import { getLatestEndedStatusEndDate } from '../caseStatusHelper';

const EditCaseStatusForm: React.FC<{
  personId: number;
  caseStatusId: number;
  prefilledFields: any;
  caseStatusType: string;
  action: string;
  currentCaseStatusStartDate?: string;
  pastCaseStatusStartDate?: string;
}> = ({
  personId,
  caseStatusId,
  caseStatusType,
  prefilledFields,
  action,
  currentCaseStatusStartDate,
  pastCaseStatusStartDate,
}) => {
  const router = useRouter();
  const { data: caseStatuses } = useCaseStatuses(personId, 'false');
  const { data: caseStatusesIncClosed } = useCaseStatuses(personId, 'true');

  const latestEndedStatusEndDate = getLatestEndedStatusEndDate(
    caseStatusesIncClosed
  );

  let form_fields: any;
  if (prefilledFields && prefilledFields['action']) {
    action = prefilledFields['action'];
  }

  if (action == 'edit' && caseStatusType == 'CIN') {
    form_fields = CASE_STATUS_EDIT.steps[0].fields;
  } else if (action == 'edit' && caseStatusType == 'CP') {
    form_fields = CASE_STATUS_EDIT.steps[1].fields;
  } else if (action == 'edit' && caseStatusType == 'LAC') {
    form_fields = CASE_STATUS_EDIT.steps[2].fields;
  } else if (action == 'end' && caseStatusType == 'LAC') {
    form_fields = CASE_STATUS_END.steps[1].fields;
  } else if (action == 'end') {
    form_fields = CASE_STATUS_END.steps[0].fields;
  }

  if (caseStatuses) {
    caseStatuses.map((status: CaseStatus) => {
      if (status.id == caseStatusId) {
        form_fields.map((field: any) => {
          if (field.id === 'notes') {
            field.default = String(status.notes);
          }
          if (field.id === 'startDate') {
            field.default = format(new Date(status.startDate), 'yyyy-MM-dd');
          }
          if (field.id === 'endDate') {
            field.startDate = format(new Date(status.startDate), 'yyyy-MM-dd');

            if (status.endDate) {
              field.default = format(new Date(status.endDate), 'yyyy-MM-dd');
            }
          }
          status.answers.map((preloaded_field) => {
            if (preloaded_field.option === field.id) {
              field.default = preloaded_field.value;
            }
          });
        });
      }
    });
  }

  if (caseStatusType == 'LAC' && (action == 'update' || action == 'end')) {
    if (
      currentCaseStatusStartDate &&
      currentCaseStatusStartDate !== 'undefined'
    ) {
      const currentStartDateValidation = new Date(currentCaseStatusStartDate);

      if (action == 'update') {
        currentStartDateValidation.setDate(
          currentStartDateValidation.getDate() + 1
        );
      }

      form_fields.map((field: any) => {
        if (field.id === 'startDate' || field.id === 'endDate') {
          field.startDate = format(
            new Date(currentStartDateValidation),
            'yyyy-MM-dd'
          );

          field.default = format(
            new Date(currentStartDateValidation),
            'yyyy-MM-dd'
          );
        }
      });
    }
  }

  if (caseStatusType != 'LAC' && action == 'edit') {
    form_fields.map((field: any) => {
      if (field.id === 'startDate') {
        if (latestEndedStatusEndDate) {
          field.startDate = format(
            new Date(latestEndedStatusEndDate),
            'yyyy-MM-dd'
          );
        }
      }
    });
  }

  if (caseStatusType == 'LAC' && action == 'edit') {
    let pastStatusStartDate: Date;
    let currentStatusStartDate: Date;
    let latestStatusEndDate: Date;

    if (pastCaseStatusStartDate && pastCaseStatusStartDate !== 'undefined') {
      pastStatusStartDate = new Date(pastCaseStatusStartDate);
      pastStatusStartDate.setDate(pastStatusStartDate.getDate() + 1);
    }

    if (
      currentCaseStatusStartDate &&
      currentCaseStatusStartDate !== 'undefined'
    ) {
      currentStatusStartDate = new Date(currentCaseStatusStartDate);
    }

    if (
      latestEndedStatusEndDate &&
      latestEndedStatusEndDate !== 'undefined' &&
      !pastCaseStatusStartDate
    ) {
      latestStatusEndDate = new Date(latestEndedStatusEndDate);
    }

    form_fields.map((field: any) => {
      if (field.id === 'startDate') {
        if (pastStatusStartDate) {
          field.startDate = format(pastStatusStartDate, 'yyyy-MM-dd');
        } else if (latestStatusEndDate) {
          field.startDate = format(latestStatusEndDate, 'yyyy-MM-dd');
        }
        if (currentStatusStartDate) {
          field.default = format(currentStatusStartDate, 'yyyy-MM-dd');
        }
      }
    });
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
        pathname: `/people/${personId}/case-status/${caseStatusId}/edit/review`,
        query: {
          action: action,
          type: caseStatusType,
          ...values,
        },
      });
    } catch (e) {
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
                  pastCaseStatusStartDate: pastCaseStatusStartDate,
                },
              }}
              scroll={false}
            >
              <a
                className={`lbh-link lbh-link--no-visited-state govuk-!-margin-left-3`}
                data-testid="cancel_button"
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
