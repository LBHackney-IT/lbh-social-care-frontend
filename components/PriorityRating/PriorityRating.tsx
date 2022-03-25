import Link from 'next/link';
import { Resident, Allocation } from 'types';

export interface Props {
  resident: Resident;
  allocation: Allocation;
}

const getRatingString = (rating: keyof typeof ratingMapping): string => {
  return ratingMapping[rating];
};

const ratingMapping = {
  purple: 'Urgent',
  red: 'High',
  orange: 'Medium',
  green: 'Low',
  white: 'No priority',
};

const PriorityRating = ({
  resident,
  allocation,
}: Props): React.ReactElement => {
  const style = {
    height: '12px',
    width: '12px',
    display: 'inline-block',
    backgroundColor: '#bbb',
    borderRadius: '50%',
  };

  style.backgroundColor = allocation.ragRating;

  return (
    <>
      {`${getRatingString(
        allocation.ragRating.toLowerCase() as keyof typeof ratingMapping
      )} `}
      <span style={style}></span>
      <span style={{ float: 'right', margin: '0' }}>
        <Link
          href={`/residents/${resident.id}/allocations/${allocation.id}/editpriority`}
        >
          <a className="lbh-link lbh-link--muted">Edit</a>
        </Link>
      </span>
    </>
  );
};

export default PriorityRating;
