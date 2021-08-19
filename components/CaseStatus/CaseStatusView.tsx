import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
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
    return <></>;
  }

  return (
    <>
      {caseStatusData && (
        <section className="govuk-!-margin-top-0">
          {caseStatusData.caseStatuses.map((status) => (
            <span
              className="govuk-tag lbh-tag govuk-!-margin-right-1 govuk-!-margin-top-2"
              key={status.id}
            >
              {getTypeString(status.type as keyof typeof valueMapping)} -{' '}
              {status.subType}
            </span>
          ))}
        </section>
      )}
    </>
  );
};

const getTypeString = (type: keyof typeof valueMapping): any => {
  return valueMapping[type];
};
const valueMapping = {
  CIN: 'Child in need',
};

export default CaseStatusView;
