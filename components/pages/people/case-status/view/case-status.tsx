import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import Spinner from 'components/Spinner/Spinner';
import { GetCaseStatus } from 'utils/api/caseStatus';
import { CaseStatus, Resident } from 'types';
import s from 'stylesheets/Section.module.scss';

interface Props {
  person: Resident;
}

const CaseStatus = ({ person }: Props): React.ReactElement => {
  const { data: caseStatusData, error } = GetCaseStatus(person.id);

  if (error) {
    return (
      <ErrorMessage label="There was a problem with getting current personal relationships." />
    );
  }

  if (!caseStatusData) {
    return <Spinner />;
  }

  return (
    <>
      <section className="govuk-!-margin-bottom-8">
        <div className={s.heading}>
          <h2>Case Status</h2>
        </div>
        console.log({caseStatusData.personId}
        {caseStatusData.caseStatuses}){caseStatusData.personId}
        {caseStatusData.caseStatuses}
      </section>
      {error && <ErrorMessage />}
    </>
  );
};

export default CaseStatus;
