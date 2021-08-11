import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import Spinner from 'components/Spinner/Spinner';
import { GetCaseStatus } from 'utils/api/caseStatus';
import { Resident } from 'types';

interface Props {
  person: Resident;
}

const CaseStatusView = ({ person }: Props): React.ReactElement => {
  const { data: caseStatusData, error } = GetCaseStatus(person.id);

  if (error) {
    return (
      <ErrorMessage label="There was a problem with getting case status." />
    );
  }

  if (!caseStatusData) {
    return <Spinner />;
  }

  return (
    <>
      {caseStatusData && (
        <section>
          <span className="govuk-tag lbh-tag">
            {caseStatusData.caseStatuses
              .map((status) => status.type)
              .join(', ')}
          </span>
        </section>
      )}
    </>
  );
};

export default CaseStatusView;
