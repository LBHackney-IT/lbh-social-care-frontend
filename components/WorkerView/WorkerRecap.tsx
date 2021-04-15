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
      <p className="govuk-body">
        Name: {firstName} {lastName}
      </p>
      <p className="govuk-body">Role: {role}</p>
      <p className="govuk-body">Teams: {teams[0].name}</p>
    </div>
  );
};

export default WorkerRecap;
