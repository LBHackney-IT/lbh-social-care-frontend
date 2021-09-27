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
      <div className={Styles.align}>
        {caseStatusData.caseStatuses.map((caseStatus) => (
          <Tip
            key={caseStatus.id}
            interactive={true}
            delay={100}
            content={
              <>
                <p className={`lbh-body-xs ${Styles.popupTitle}`}>
                  {valueMapping[caseStatus.type]}
                </p>
                <p className="lbh-body-xs">{`Start date: ${format(
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
            <span className={`${Styles.statusTag}`}>
              {valueMapping[caseStatus.type]}
            </span>
          </Tip>
        ))}
      </div>
    </>
  );
};

export default CaseStatusView;
