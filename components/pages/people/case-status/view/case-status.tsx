import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { getCaseStatus } from 'utils/api/caseStatus';
import { Resident } from 'types';

interface Props {
  person: Resident;
}

const CaseStatusView = ({ person }: Props): React.ReactElement => {
  const { data: caseStatusData, error } = getCaseStatus(person.id);

  if (error) {
    return (
      <ErrorMessage label="There was a problem with getting case status." />
    );
  }

  if (!caseStatusData) {
    return <ErrorMessage label="No case status found for this person." />;
  }

  return (
    <>
      {caseStatusData && (
        <section>
          {caseStatusData.caseStatuses.map((status) => (
            <span className="govuk-tag lbh-tag" key={status.id}>
              {status.type}
            </span>
          ))}
        </section>
      )}
    </>
  );
};

export default CaseStatusView;
