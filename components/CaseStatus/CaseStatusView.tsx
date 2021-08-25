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
      {groupByType(caseStatusData.caseStatuses, (data: any) => data.type).map(
        (status) => (
          <span
            className="govuk-tag lbh-tag lbh-tag--yellow govuk-!-margin-right-1 govuk-!-margin-top-2"
            key={status}
          >
            {getTypeString(status as keyof typeof valueMapping)}
          </span>
        )
      )}
    </>
  );
};

function groupByType(list: any, keyGetter: any) {
  const map = new Array<string>();
  list.forEach((item: any) => {
    const key = keyGetter(item);
    const collection = map.find((elm) => elm === key);
    if (!collection) {
      map.push(key);
    }
  });
  return map;
}

const getTypeString = (type: keyof typeof valueMapping): any => {
  return valueMapping[type];
};
const valueMapping = {
  CIN: 'Child in need',
  CPP: 'Child protection services',
  LAC: 'Looked after child',
};

export default CaseStatusView;
