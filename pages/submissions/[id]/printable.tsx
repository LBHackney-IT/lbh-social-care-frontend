import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { Form } from '../../../data/flexibleForms/forms.types';
import { getProtocol } from 'utils/urls';
import axios from 'axios';
import { useEffect } from 'react';
import PrintableForm from 'components/PrintableForm/PrintableForm';

interface Props {
  form: Form;
}

const PrintableFormPage = ({ form }: Props): React.ReactElement => {
  useEffect(() => {
    window.print();
  }, []);

  return (
    <>
      <Head>
        <title>{form.name}</title>
      </Head>
      <PrintableForm form={form} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const protocol = getProtocol();

  const { data } = await axios.get(
    `${protocol}://${process.env.REDIRECT_URL}/api/submissions/${params?.id}`
  );

  // redirect if submission or form doesn't exist
  if (!data.submissionId || !data.form)
    return {
      props: {},
      redirect: {
        destination: '/404',
      },
    };

  return {
    props: {
      params,
      ...data,
    },
  };
};

PrintableFormPage.noLayout = true;

export default PrintableFormPage;
