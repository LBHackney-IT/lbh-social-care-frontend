import { useState } from 'react';
import { useWorker } from 'utils/api/workers';
import WorkerSearch from 'components/WorkerView/WorkerSearch';
import { Worker } from 'types';

const WorkerRecap = ({
  firstName,
  lastName,
  role,
  teams,
}: Worker): React.ReactElement => {
  return (
    <div>
      <h2 className="gov-weight-lighter">
        Worker&apos;s details found in system
      </h2>
      <p>
        Name: {firstName} {lastName}
      </p>
      <p>Main Service: {role}</p>
      <p>Teams: {teams[0].name}</p>
    </div>
  );
};

export default WorkerRecap;
