import { Form, Formik, FormikHelpers, FormikValues } from 'formik';
import { Choice } from 'data/flexibleForms/forms.types';
import CASE_STATUS_EDIT from 'data/flexibleForms/caseStatus/editCaseStatus';
import CASE_STATUS_END from 'data/flexibleForms/caseStatus/endCaseStatus';
import CASE_STATUS_UPDATE from 'data/flexibleForms/caseStatus/updateCaseStatus';
import { generateInitialValues } from 'lib/utils';
import { generateFlexibleSchema } from 'lib/validators';
import FlexibleField from 'components/FlexibleForms/FlexibleFields';
import Button from 'components/Button/Button';
import { CaseStatus } from 'types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCaseStatuses, useFormValues } from 'utils/api/caseStatus';
import { format } from 'date-fns';

const EditCaseStatusForm: React.FC<{
  personId: number;
  caseStatusId: number;
  prefilledFields: any;
  caseStatusType: string;
  action: string;
}> = ({ personId, caseStatusId, caseStatusType, prefilledFields, action }) => {
  const router = useRouter();
  const { data: caseStatusData } = useCaseStatuses(personId);
  const { data: caseStatusFields } = useFormValues(caseStatusType);

  let form_fields: any;
  if (prefilledFields && prefilledFields['action']) {
    action = prefilledFields['action'];
  }

  switch (action) {
    case 'edit':
      form_fields = [...CASE_STATUS_EDIT.steps[0].fields];
      break;
    case 'end':
      form_fields = [...CASE_STATUS_END.steps[0].fields];
      break;
    default:
      form_fields = [...CASE_STATUS_UPDATE.steps[0].fields];
      break;
  }

  if (action === 'edit' && caseStatusFields) {
    caseStatusFields.fields.map((field) => {
      const choices: Choice[] = [];
      field.options.map((option: any) => {
        choices.push({
          value: option.name,
          label: option.description,
        });
      });

      const fieldObj = {
        id: field.name,
        question: field.description,
        type: 'select',
        required: true,
        choices: choices,
      };

      form_fields.push(fieldObj);
    });
  }

  if (action === 'update' && caseStatusFields) {
    caseStatusFields.fields.map((field) => {
      console.log(field);

      if (field.name === 'legalStatus') {
        const choices: Choice[] = [];

        field.options.map((option: any) => {
          choices.push({
            value: option.name,
            label: option.description,
          });
        });

        form_fields.map((e: any) => {
          if (e.id === 'newLegalStatus') {
            console.log(e.id);
            e.choices = choices;
          }
        });
      }

      if (field.name === 'placementType') {
        const choices: Choice[] = [];

        field.options.map((option: any) => {
          choices.push({
            value: option.name,
            label: option.description,
          });
        });

        form_fields.map((e: any) => {
          if (e.id === 'newPlacementType') {
            e.choices = choices;
          }
        });
      }
    });
  }

  if (action === 'edit' && caseStatusData) {
    caseStatusData.caseStatuses.map((status: CaseStatus) => {
      if (status.id == caseStatusId) {
        form_fields.map((field: any) => {
          if (field.id === 'notes') {
            field.default = String(status.notes);
          }
          if (field.id === 'startDate') {
            field.default = format(new Date(status.startDate), 'yyyy-MM-dd');
          }
          status.fields.map((preloaded_field) => {
            if (preloaded_field.name === field.id) {
              field.default = preloaded_field.selectedOption.name;
            }
          });
        });
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
                query: { action: action, type: caseStatusType },
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
