import Link from 'next/link';
import { Resident, Allocation } from 'types';

export interface Props {
  resident: Resident;
  allocation: Allocation;
}

export const getRatingString = (rating: keyof typeof ratingMapping): string => {
  return ratingMapping[rating];
};
export const getRatingColour = (rating: keyof typeof colorMapping): string => {
  return colorMapping[rating];
};

const ratingMapping = {
  purple: 'Urgent',
  red: 'High',
  amber: 'Medium',
  green: 'Low',
  white: 'No priority',
};

const colorMapping = {
  purple: 'purple',
  red: 'red',
  amber: 'orange',
  green: 'green',
  white: 'grey',
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

  style.backgroundColor = getRatingColour(
    allocation.ragRating.toLowerCase() as keyof typeof colorMapping
  );

  return (
    <>
      {`${getRatingString(
        allocation.ragRating.toLowerCase() as keyof typeof ratingMapping
      )} `}
      <span data-testid="colourdot" style={style}></span>
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
