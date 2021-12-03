import s from 'components/MashCards/MashCard.module.scss';

interface Props {
  isPriority: boolean;
  children: React.ReactChild;
}

const MashPriorityBanner = ({
  isPriority,
  children,
}: Props): React.ReactElement => {
  return (
    <>
      {isPriority && <div className={s.priority}>&nbsp;High priority</div>}
      <li className={isPriority ? `${s.row} ${s.priorityrow}` : s.row}>
        {children}
      </li>
    </>
  );
};
export default MashPriorityBanner;
