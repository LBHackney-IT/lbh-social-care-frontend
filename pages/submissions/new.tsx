import { GetServerSideProps } from 'next';
import StartForm, { FormValues } from 'components/StartForm/StartForm';
import { useRouter } from 'next/router';
import { Form } from 'data/flexibleForms/forms.types';
import { getProtocol } from 'utils/urls';
import { FormikHelpers } from 'formik';

interface Props {
  forms: Form[];
}

const NewSubmissionPage = ({ forms }: Props): React.ReactElement => {
  const router = useRouter();

  const handleSubmit = async (
    values: FormValues,
    { setStatus }: FormikHelpers<FormValues>
  ): Promise<void> => {
    try {
      const res = await fetch(`/api/submissions`, {
        method: 'POST',
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (data.error) throw data.error;
      router.push(`/submissions/${data.id}`);
    } catch (e) {
      setStatus(e.toString());
    }
  };

  return (
    <div>
      <h1 className="govuk-heading-h1 govuk-!-margin-bottom-8">
        Record something new
      </h1>

      {forms && <StartForm onSubmit={handleSubmit} forms={forms} />}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const protocol = getProtocol();

  const res2 = await fetch(
    `${protocol}://${process.env.REDIRECT_URL}/api/submissions`,
    {
      headers: {
        cookie: req.headers.cookie,
      } as HeadersInit,
    }
  );
  const data = await res2.json();
  return {
    props: {
      ...data,
    },
  };
};

export default NewSubmissionPage;
