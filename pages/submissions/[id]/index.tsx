import { GetServerSideProps } from 'next';
import Head from 'next/head';
import PersonWidget from 'components/PersonWidget/PersonWidget';
import TaskList from 'components/TaskList/TaskList';
import TaskListHeader from 'components/TaskList/TaskListHeader';
import Banner from 'components/FlexibleForms/Banner';
import { Form, FlexibleAnswers } from '../../../data/flexibleForms/forms.types';
import { Resident } from '../../../types';
import { getProtocol } from 'utils/urls';
import s from 'stylesheets/Sidebar.module.scss';
import axios from 'axios';
import React, { useState } from 'react';
import { useRouter } from 'next/router';

interface Props {
  params: {
    id: string;
  };
  formAnswers: FlexibleAnswers;
  residents: Resident[];
  form: Form;
}

const TaskListPage = ({
  params,
  // completedSteps,
  formAnswers,
  residents,
  form,
}: Props): React.ReactElement => {
  const router = useRouter();
  const [status, setStatus] = useState<string | false>(false);

  const completedSteps = Object.keys(formAnswers);
  const person = residents[0];

  const handleFinish = async (): Promise<void> => {
    try {
      await axios.post(`/api/submissions/${params.id}`);
      router.push(`/people/${person.id}/submissions/${params.id}`);
    } catch (e) {
      setStatus(e.toString());
    }
  };

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
          {status && (
            <Banner
              title="There was a problem finishing the submission"
              className="lbh-page-announcement--warning"
            >
              <p>Please refresh the page or try again later.</p>
              <p className="lbh-body-xs">{status}</p>
            </Banner>
          )}

          <TaskListHeader
            steps={form.steps}
            completedSteps={completedSteps}
            onFinish={handleFinish}
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
  if (!data.submissionId || !data.form)
    return {
      props: {},
      redirect: {
        destination: '/404',
      },
    };

  if (data.submissionState !== 'In progress') {
    return {
      props: {},
      redirect: {
        destination: `/people/${data.residents[0].id}/submissions/${data.submissionId}`,
      },
    };
  }

  return {
    props: {
      params,
      ...data,
    },
  };
};

export default TaskListPage;
