import Dialog from 'components/Dialog/Dialog';
import axios from 'axios';
import { Submission } from 'data/flexibleForms/forms.types';
import { Formik, Form, FormikHelpers } from 'formik';
import TextField from 'components/FlexibleForms/TextField';
import Banner from 'components/FlexibleForms/Banner';
import { rejectionSchema } from 'lib/validators';

interface Props {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
  submission: Submission;
}

interface FormValues {
  rejectionReason: string;
}

const ApproveDialog = ({
  submission,
  isOpen,
  setOpen,
}: Props): React.ReactElement => {
  const handleReject = async (
    values: FormValues,
    { setStatus }: FormikHelpers<FormValues>
  ): Promise<void> => {
    try {
      await axios.delete(
        `/api/submissions/${submission.submissionId}/approvals`,
        {
          data: values,
        }
      );
      setOpen(false);
    } catch (e) {
      setStatus(e.toString);
    }
  };

  return (
    <Dialog
      title="Return for edits"
      isOpen={isOpen}
      onDismiss={() => setOpen(false)}
    >
      <p>
        We&apos;ll notify <strong>{submission.createdBy.email}</strong>, who
        started this submission.
      </p>
      <Formik
        initialValues={{
          rejectionReason: '',
        }}
        validationSchema={rejectionSchema}
        onSubmit={handleReject}
      >
        {({ touched, errors, isSubmitting, status }) => (
          <Form>
            {status && (
              <Banner
                title="There was a problem returning the submission"
                className="lbh-page-announcement--warning"
              >
                <p>Please refresh the page or try again later.</p>
                <p className="lbh-body-xs">{status}</p>
              </Banner>
            )}
            <TextField
              label="What needs to be changed?"
              name="rejectionReason"
              touched={touched}
              errors={errors}
              as="textarea"
              required
            />
            <button
              className="govuk-button lbh-button lbh-button--danger"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default ApproveDialog;
