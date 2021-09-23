import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { useCaseStatuses } from 'utils/api/caseStatus';
import { Resident, CaseStatus, CaseStatusMapping } from 'types';
import Tip from 'components/Tip/Tip';

interface Props {
  person: Resident;
}

const CaseStatusView = ({ person }: Props): React.ReactElement => {
  const { data: caseStatusData, error } = useCaseStatuses(person.id);

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
      {groupByType(caseStatusData.caseStatuses).map((status) => (
        <Tip
          key={status}
          interactive={true}
          content={
            <>
              <p className="lbh-body-xs">{valueMapping[status]}</p>
              <p className="lbh-body-xs">{}</p>
              <a
                href={`http://dev.hackney.gov.uk:3000/people/${person.id}/details`}
              >
                View details
              </a>
            </>
          }
        >
          <span
            key={status}
            className="govuk-tag lbh-tag lbh-tag--yellow govuk-!-margin-right-1 govuk-!-margin-top-2"
          >
            {valueMapping[status]}
          </span>
        </Tip>
      ))}

      {/* {caseStatusData.caseStatuses.map((status: CaseStatus) => {
        const view = (
          <div>
            {status.type && (

              <span>
                {valueMapping[status.type]}
              </span>
            )}
          </div>
        );

        return (
          <div>
          <Tip
            
            interactive={true}
            content={
              <>
                <p className="lbh-body-xs">{}</p>
                <p className="lbh-body-xs">{}</p>
                <a
                  href={`http://dev.hackney.gov.uk:3000/people/${person.id}/details`}
                >
                  View details
                </a>
              </>
            }
          >
            <span
              className="govuk-tag lbh-tag lbh-tag--yellow govuk-!-margin-right-1 govuk-!-margin-top-2"
            >
              {valueMapping[status.type]}
            </span>
          </Tip>
          </div>
        )
      }
      )} */}
    </>
  );
};

const valueMapping = new CaseStatusMapping();

function groupByType(
  allCasesStatues: CaseStatus[]
): (keyof typeof valueMapping)[] {
  return Array.from(new Set(allCasesStatues.map((el) => el.type)));
}

export default CaseStatusView;
