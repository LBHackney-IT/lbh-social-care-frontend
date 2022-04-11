import Link from 'next/link';
import { Resident, Allocation } from 'types';

export interface Props {
  resident: Resident;
  allocation: Allocation;
}

export const getRatingString = (rating: string) => {
  return ratingMapping[rating as keyof typeof ratingMapping];
};
export const getRatingColour = (rating: string) => {
  return colorMapping[rating as keyof typeof colorMapping];
};
export const getRatingCSSColour = (rating: string) => {
  return cssMapping[rating as keyof typeof cssMapping];
};

const ratingMapping = {
  urgent: 'Urgent',
  high: 'High',
  medium: 'Medium',
  low: 'Low',
  none: 'No priority set',
};

export const colorMapping = {
  urgent: 'purple',
  high: 'red',
  medium: 'orange',
  low: 'green',
  none: 'grey',
};
export const cssMapping = {
  urgent: '#8031A7',
  high: '#BE3A34',
  medium: '#FFBF47',
  low: '#00664F',
  none: 'grey',
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
    marginTop: 0,
  };

  if (!allocation.ragRating) {
    allocation.ragRating = 'none';
  }

  style.backgroundColor = getRatingCSSColour(
    allocation.ragRating.toLowerCase()
  );

  return (
    <>
      <span
        id={`${
          allocation.allocatedWorkerTeam && allocation.allocatedWorkerTeam
        }_priorityRating`}
      >{`${getRatingString(
        allocation.ragRating.toLowerCase() as keyof typeof ratingMapping
      )} `}</span>
      <span data-testid="colourdot" style={style}></span>

      <span style={{ float: 'right', margin: '0 -18px 0 0' }}>
        <Link
          href={`/residents/${resident.id}/allocations/${allocation.id}/editpriority`}
        >
          <a
            id={`${
              allocation.allocatedWorkerTeam && allocation.allocatedWorkerTeam
            }_editPriority`}
            className="lbh-link lbh-link--muted"
          >
            Edit
          </a>
        </Link>
      </span>
    </>
  );
};

export default PriorityRating;
