import { useCaseStatuses } from 'utils/api/caseStatus';
import { Resident, CaseStatusMapping } from 'types';
import Tip from 'components/Tip/Tip';
import { format } from 'date-fns';
import Styles from './CaseStatusFlag.module.scss';

interface Props {
  person: Resident;
}

const CaseStatusFlag = ({ person }: Props): React.ReactElement | null => {
  const { data } = useCaseStatuses(person.id);

  if (data && data?.length > 0)
    return (
      <>
        <div className={Styles.align}>
          {data.map((status) => (
            <Tip
              key={status.id}
              interactive={true}
              delay={100}
              content={
                <>
                  <p className={`lbh-body-xs ${Styles.popupTitle}`}>
                    {CaseStatusMapping[status.type]}
                  </p>
                  <p className="lbh-body-xs">{`Start date: ${format(
                    new Date(status.startDate),
                    'dd MMM yyyy'
                  )}`}</p>
                  <a href={`/people/${person.id}/details`}>View details</a>
                </>
              }
            >
              <span
                className="govuk-tag lbh-tag lbh-tag--yellow govuk-!-margin-right-1 govuk-!-margin-top-2"
                key={status.id}
              >
                {CaseStatusMapping[status.type]}
              </span>
            </Tip>
          ))}
        </div>
      </>
    );

  return null;
};

export default CaseStatusFlag;
