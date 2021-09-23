import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { useCaseStatuses } from 'utils/api/caseStatus';
import { Resident, CaseStatusMapping } from 'types';
import Tip from 'components/Tip/Tip';
import format from 'date-fns/format';
import Styles from './CaseStatusView.module.scss';

const valueMapping = new CaseStatusMapping();

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
      {caseStatusData.caseStatuses.map((caseStatus) => (
        <div key={caseStatus.id} className={Styles.align}>
          <Tip
            key={caseStatus.id}
            interactive={true}
            content={
              <>
                <p
                  className="lbh-body-xs"
                  style={{ fontWeight: 'bold', marginBottom: 0 }}
                >
                  {valueMapping[caseStatus.type]}
                </p>
                <p
                  className="lbh-body-xs"
                  style={{ marginTop: 0 }}
                >{`Start date: ${format(
                  new Date(caseStatus.startDate),
                  'dd MMM yyyy'
                )}`}</p>
                <a
                  href={`http://dev.hackney.gov.uk:3000/people/${person.id}/details`}
                >
                  View details
                </a>
              </>
            }
          >
            <span
              key={caseStatus.id}
              className="govuk-tag lbh-tag lbh-tag--yellow govuk-!-margin-right-1 govuk-!-margin-top-2"
            >
              {valueMapping[caseStatus.type]}
            </span>
          </Tip>
        </div>
      ))}
    </>
  );
};

export default CaseStatusView;
