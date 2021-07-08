import Dialog from 'components/Dialog/Dialog';
import axios from 'axios';
import { Submission } from 'data/flexibleForms/forms.types';
import { Formik, Form, FormikValues } from 'formik';
import TextField from 'components/FlexibleForms/TextField';

interface Props {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
  submission: Submission;
}

const ApproveDialog = ({
  submission,
  isOpen,
  setOpen,
}: Props): React.ReactElement => {
  const handleReject = async (values: FormikValues) => {
    await axios.delete(
      `/api/submissions/${submission.submissionId}/approvals`,
      values
    );
    setOpen(false);
  };

  return (
    <Dialog
      title="Return this submission for edits"
      isOpen={isOpen}
      onDismiss={() => setOpen(false)}
    >
      <Formik
        initialValues={{
          reason: '',
        }}
        onSubmit={handleReject}
      >
        {({ touched, errors, isSubmitting }) => (
          <Form>
            <TextField
              label="What needs to be changed?"
              name="reason"
              touched={touched}
              errors={errors}
              as="textarea"
            />
            <button
              className="govuk-button  lbh-button"
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
