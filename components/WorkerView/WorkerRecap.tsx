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
      <h2 className={`lbh-heading-h2 gov-weight-lighter ${style.title}`}>
        Worker&apos;s details found in system
      </h2>
      <p className="lbh-body govuk-body">
        Name: {firstName} {lastName}
      </p>
      <p className="lbh-body govuk-body">Role: {role}</p>
      <p className="lbh-body govuk-body">Teams: {teams[0]?.name}</p>
    </div>
  );
};

export default WorkerRecap;
