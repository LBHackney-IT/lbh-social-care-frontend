import { GetServerSideProps } from 'next';
import { Form } from '../../../data/flexibleForms/forms.types';
import { getProtocol } from 'utils/urls';
import axios from 'axios';

interface Props {
  form: Form;
}

const TaskListPage = ({ form }: Props): React.ReactElement => {
  return <>test</>;
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

export default TaskListPage;
