import s from './index.module.scss';
import { Submission } from 'data/flexibleForms/forms.types';
import Link from 'next/link';

interface SubProps {
  sub: Submission;
}

const Sub = ({ sub }: SubProps): React.ReactElement => {
  const completedSteps = Object.keys(sub.formAnswers).length;
  const totalSteps = sub.form?.steps?.length;

  return (
    <li key={sub.submissionId}>
      <Link href={`/submissions/${sub.submissionId}`}>
        {sub?.form?.name || sub.formId}
      </Link>{' '}
      <p className="lbh-body-xs">
        {Math.round((completedSteps / Number(totalSteps)) * 100)}% complete ·{' '}
        {sub.createdBy.email}
      </p>
    </li>
  );
};

interface Props {
  submissions: Submission[];
}

const UnfinishedSubmissionsEvent = ({
  submissions,
}: Props): React.ReactElement => (
  <li
    className={`lbh-timeline__event lbh-timeline__event--action-needed ${s.unfinishedSubmissionsPanel}`}
  >
    <h3 className="lbh-heading-h3">Unfinished submissions</h3>
    <ul className="lbh-list lbh-body-s">
      {submissions.slice(0, 4).map((sub) => (
        <Sub sub={sub} key={sub.submissionId} />
      ))}
    </ul>
    {submissions.length > 4 && (
      <p className="lbh-body-s">and {submissions.length - 4} more</p>
    )}
  </li>
);

export default UnfinishedSubmissionsEvent;
