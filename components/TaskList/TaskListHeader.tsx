import { Step } from '../../data/flexibleForms/forms.types';
import TextField from 'components/FlexibleForms/TextField';
import { Formik, Form } from 'formik';
import { submitSchema } from 'lib/validators';
import s from './TaskList.module.scss';

interface Props {
  approvable?: boolean;
  steps: Step[];
  completedSteps: string[];
  onFinish: () => void;
}

const TaskListHeader = ({
  approvable,
  steps,
  completedSteps,
  onFinish,
}: Props): React.ReactElement => {
  if (completedSteps.length < steps.length)
    return (
      <>
        <h2 className="lbh-heading-h4">Submission incomplete</h2>
        <p className="lbh-body  govuk-!-margin-top-2">
          You&apos;ve completed {completedSteps.length} of {steps.length}{' '}
          sections.
        </p>
      </>
    );

  if (approvable)
    return (
      <>
        <h2 className="lbh-heading-h4">Ready to send</h2>
        <p className="lbh-body  govuk-!-margin-top-2">
          You can now submit for approval.
        </p>

        <Formik
          onSubmit={onFinish}
          initialValues={{
            approverEmail: '',
          }}
          validationSchema={submitSchema}
        >
          {({ touched, errors, isSubmitting }) => (
            <Form className={s.submitForm}>
              <TextField
                name="approverEmail"
                touched={touched}
                errors={errors}
                label="Who should approve this?"
                hint="Enter the email address of a manager or colleague"
                required
              />
              <button
                className="govuk-button lbh-button"
                disabled={isSubmitting}
              >
                Finish and send
              </button>
            </Form>
          )}
        </Formik>
      </>
    );

  return (
    <>
      <h2 className="lbh-heading-h4">Ready to send</h2>
      <button onClick={onFinish} className="govuk-button lbh-button">
        Finish and send
      </button>
    </>
  );
};

export default TaskListHeader;
