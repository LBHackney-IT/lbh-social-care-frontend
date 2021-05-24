import { Worker } from 'types';

import style from './WorkerRecap.module.scss';

const WorkerRecap = ({
  firstName,
  lastName,
  role,
  teams,
}: Worker): React.ReactElement => {
  return (
    <div className={style.detailsContainer}>
      <h2 className={`lbh-heading-h2 ${style.title}`}>
        Worker&apos;s details found in system
      </h2>
      <p>
        Name: {firstName} {lastName}
      </p>
      <p>Role: {role}</p>
      <p>Teams: {teams[0]?.name}</p>
    </div>
  );
};

export default WorkerRecap;
