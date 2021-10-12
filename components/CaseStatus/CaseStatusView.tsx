import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { useCaseStatuses } from 'utils/api/caseStatus';
import { Resident, CaseStatusMapping } from 'types';
import Tip from 'components/Tip/Tip';
import { format } from 'date-fns';
import Styles from 'components/CaseStatus/CaseStatusView.module.scss';

interface Props {
  person: Resident;
}

const CaseStatusView = ({ person }: Props): React.ReactElement => {
  const { data, error } = useCaseStatuses(person.id);

  if (error) {
    return (
      <ErrorMessage label="There was a problem with getting case status." />
    );
  }

  if (!data || data?.length === 0) {
    return <></>;
  }

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
              key={status.id}
            >
              {CaseStatusMapping[status.type]}
            </span>
          </Tip>
        ))}
      </div>
    </>
  );
};

export default CaseStatusView;
