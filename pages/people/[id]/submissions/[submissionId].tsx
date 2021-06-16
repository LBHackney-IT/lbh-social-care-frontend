import { GetServerSideProps } from 'next';
import { Submission } from 'data/flexibleForms/forms.types';
import { getSubmissionById } from 'lib/submissions';
import { getResident } from 'lib/residents';
import FlexibleAnswers from 'components/FlexibleAnswers/FlexibleAnswers';
import Head from 'next/head';
import s from 'stylesheets/Sidebar.module.scss';
import PersonWidget from 'components/PersonWidget/PersonWidget';
import { Resident } from 'types';

interface Props {
  submission: Submission;
  person: Resident;
}

const SubmissionPage = ({ submission, person }: Props): React.ReactElement => (
  <>
    <Head>
      <title>{'Submission'} | Social care | Hackney Council</title>
    </Head>
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <h1 className="lbh-heading-h1 govuk-!-margin-bottom-8">
          {'Submission'}
        </h1>
      </div>
    </div>
    <div className={`govuk-grid-row ${s.outer}`}>
      <div className="govuk-grid-column-two-thirds">
        <FlexibleAnswers answers={submission.formAnswers} />
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

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const submission = await getSubmissionById(String(params?.submissionId));
  const person = await getResident(Number(params?.id));

  return {
    props: {
      submission,
      person,
    },
  };
};

export default SubmissionPage;
