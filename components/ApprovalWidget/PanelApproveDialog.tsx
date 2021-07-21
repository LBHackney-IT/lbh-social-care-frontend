import Dialog from 'components/Dialog/Dialog';
import axios from 'axios';
import { Submission } from 'data/flexibleForms/forms.types';
import Banner from 'components/FlexibleForms/Banner';
import { Form, Formik, Field, ErrorMessage, FormikHelpers } from 'formik';
import { panelApproveSchema } from 'lib/validators';

interface Props {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
  submission: Submission;
}

interface FormValues {
  confirmed: boolean;
}

const PanelApproveDialog = ({
  submission,
  isOpen,
  setOpen,
}: Props): React.ReactElement => {
  const handleSubmit = async (
    values: FormValues,
    { setStatus }: FormikHelpers<FormValues>
  ) => {
    try {
      await axios.post(
        `/api/submissions/${submission.submissionId}/panel-approvals`
      );
      setOpen(false);
    } catch (e) {
      setStatus(e.toString());
    }
  };

  return (
    <Dialog
      title="Are you sure you want to mark this submission as panel approved?"
      isOpen={isOpen}
      onDismiss={() => setOpen(false)}
    >
      <Formik
        validationSchema={panelApproveSchema}
        initialValues={{ confirmed: false }}
        onSubmit={handleSubmit}
      >
        {({ status, isSubmitting }) => (
          <Form>
            {status && (
              <Banner
                title="There was a problem approving the submission"
                className="lbh-page-announcement--warning"
              >
                <p>Please refresh the page or try again later.</p>
                <p className="lbh-body-xs">{status}</p>
              </Banner>
            )}

            <div className="govuk-form-group lbh-form-group govuk-checkboxes lbh-checkboxes govuk-checkboxes__item govuk-!-margin-top-6">
              <Field
                type="checkbox"
                className="govuk-checkboxes__input"
                id="confirmed"
                name="confirmed"
              />
              <label
                className="govuk-label govuk-checkboxes__label"
                htmlFor="confirmed"
              >
                The panel met and approved this work
              </label>
            </div>

            <ErrorMessage name="confirmed">
              {(msg) => (
                <p
                  className="govuk-error-message lbh-error-message govuk-!-margin-top-2"
                  role="alert"
                >
                  <span className="govuk-visually-hidden">Error:</span>
                  {msg}
                </p>
              )}
            </ErrorMessage>

            <button className="govuk-button lbh-button" disabled={isSubmitting}>
              Yes, approve
            </button>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default PanelApproveDialog;
