import s from 'components/MashCards/MashCard.module.scss';

interface Props {
  isPriority: boolean;
}

const MashPriorityBanner = ({ isPriority }: Props): React.ReactElement => {
  if (isPriority === true)
    return (
      <>
        <div className={s.priority}>&nbsp;High priority</div>
        <li className={`${s.row} ${s.priorityrow}`} />
      </>
    );
  else return <li className={s.row} />;
};
export default MashPriorityBanner;
