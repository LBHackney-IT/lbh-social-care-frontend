import { GetServerSideProps } from 'next';
import Head from 'next/head';
import PersonWidget from '../../../components/PersonWidget/PersonWidget';
import TaskList from '../../../components/TaskList/TaskList';
import TaskListHeader from '../../../components/TaskList/TaskListHeader';
import { Form } from '../../../data/flexibleForms/forms.types';
import { Resident } from '../../../types';
import { getProtocol } from 'utils/urls';
import s from 'stylesheets/Sidebar.module.scss';
import axios from 'axios';

interface Props {
  completedSteps: string[];
  person: Resident;
  form: Form;
}

const TaskListPage = ({
  completedSteps,
  person,
  form,
}: Props): React.ReactElement => {
  return (
    <>
      <Head>
        <title>{form.name} | Social care | Hackney Council</title>
      </Head>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <h1 className="lbh-heading-h1 govuk-!-margin-bottom-8">
            {form.name}
          </h1>
        </div>
      </div>
      <div className={`govuk-grid-row ${s.outer}`}>
        <div className="govuk-grid-column-two-thirds">
          <TaskListHeader
            steps={form.steps}
            completedSteps={completedSteps}
            onFinish={() => {
              null;
            }}
          />
          <TaskList form={form} completedSteps={completedSteps} />
        </div>
        <div className="govuk-grid-column-one-third">
          <div className={s.sticky}>
            <p className="lbh-body">This is for:</p>
            <PersonWidget person={person} />
          </div>
        </div>
      </div>
    </>
  );
};

TaskListPage.goBackButton = true;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const protocol = getProtocol();

  const { data } = await axios.get(
    `${protocol}://${process.env.REDIRECT_URL}/api/submissions/${params?.id}`
  );

  // redirect if submission or form doesn't exist
  if (!data.id || !data.form)
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
