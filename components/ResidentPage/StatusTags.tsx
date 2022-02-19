import { Resident } from 'types';
import { useCaseStatuses } from 'utils/api/caseStatus';
import s from './StatusTags.module.scss';

interface Props {
  resident: Resident;
}

const StatusTags = ({ resident }: Props): React.ReactElement => {
  const { data: statuses } = useCaseStatuses(resident.id);

  return (
    <ul className={s.list}>
      {(resident?.contextFlag === 'A' || resident.contextFlag === 'B') && (
        <li className="govuk-tag lbh-tag lbh-tag--yellow">Adult social care</li>
      )}

      {(resident?.contextFlag === 'C' || resident.contextFlag === 'B') && (
        <li className="govuk-tag lbh-tag lbh-tag--yellow">
          Children&apos;s social care
        </li>
      )}

      {resident.openCase && (
        <li className="govuk-tag lbh-tag lbh-tag--blue">Open case</li>
      )}

      {resident.primarySupportReason && (
        <li className="govuk-tag lbh-tag lbh-tag--green">
          {resident.primarySupportReason}
        </li>
      )}

      {resident?.dateOfDeath && (
        <li className="govuk-tag lbh-tag lbh-tag--grey">Deceased</li>
      )}

      {resident?.restricted === 'Y' && (
        <li className="govuk-tag lbh-tag lbh-tag--red">Restricted</li>
      )}

      {statuses?.map((s) => (
        <li key={s.id} className="govuk-tag lbh-tag">
          {s.type}
        </li>
      ))}
    </ul>
  );
};

export default StatusTags;
