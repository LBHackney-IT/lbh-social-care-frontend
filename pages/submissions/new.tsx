import { useCallback } from 'react';
import { GetServerSideProps } from 'next';
import StartForm, { FormValues } from 'components/StartForm/StartForm';
import { useRouter } from 'next/router';
import { Form } from 'data/flexibleForms/forms.types';
import { getProtocol } from 'utils/urls';
import { FormikHelpers } from 'formik';
import axios from 'axios';

interface Props {
  forms: Form[];
}

const NewSubmissionPage = ({ forms }: Props): React.ReactElement => {
  const router = useRouter();

  const handleSubmit = useCallback(
    async (
      values: FormValues,
      { setStatus }: FormikHelpers<FormValues>
    ): Promise<void> => {
      try {
        const { data } = await axios.post(`/api/submissions`, values);
        if (data.error || !data.submissionId) throw data.error;
        router.push(`/submissions/${data.submissionId}`);
      } catch (e) {
        setStatus(e.toString());
      }
    },
    [router]
  );

  return (
    <div>
      <h1 className="govuk-heading-h1 govuk-!-margin-bottom-8">
        Record something new
      </h1>

      {forms && <StartForm onSubmit={handleSubmit} forms={forms} />}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const protocol = getProtocol();

  const { data } = await axios.get(
    `${protocol}://${process.env.REDIRECT_URL}/api/submissions`
  );

  return {
    props: {
      ...data,
    },
  };
};

export default NewSubmissionPage;
