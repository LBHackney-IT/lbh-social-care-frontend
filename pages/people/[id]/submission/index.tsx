import { GetServerSideProps } from 'next';
import Head from 'next/head';
import PersonWidget from '../../../components/PersonWidget';
import TaskList from '../../../../components/TaskList/TaskList';
import Link from 'next/link';
import TaskListHeader from '../../../../components/TaskList/TaskListHeader';

const TaskListPage = ({ params, completedSteps, person, form }) => {
  return (
    <>
      <Head>
        <title>{form?.name} | Social care | Hackney Council</title>
      </Head>
      <h1 className="lbh-heading-h1 govuk-!-margin-bottom-8">{form?.name}</h1>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <TaskListHeader
            steps={form?.steps}
            completedSteps={completedSteps}
            onFinish={() => {
              null;
            }}
          />
          <TaskList form={form} completedSteps={completedSteps} />
        </div>
        <div className="govuk-grid-column-one-third">
          <PersonWidget person={person} />
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
  res,
}) => {
  const res1 = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/submissions/${params.id}`,
    {
      headers: {
        cookie: req.headers.cookie,
      },
    }
  );

  const data = await res1.json();

  // redirect if submission doesn't exist
  if (!data.id)
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
