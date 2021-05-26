import Link from 'next/link';

import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import Spinner from 'components/Spinner/Spinner';
import PersonDetails from './PersonDetails';
import { useResident } from 'utils/api/residents';
import { Resident, User } from 'types';
import { useAuth } from '../UserContext/UserContext';
import { canUserEditPerson } from '../../lib/permissions';

interface Props {
  personId: number;
  children?: React.ReactChild | ((arg0: Resident) => React.ReactChild);
  expandView?: boolean;
  showPersonDetails?: boolean;
}

const PersonView = ({
  personId,
  expandView,
  children,
  showPersonDetails = true,
}: Props): React.ReactElement => {
  const { user } = useAuth() as { user: User };
  const { data: person, error } = useResident(personId);
  if (error) {
    return <ErrorMessage />;
  }
  if (!person) {
    return <Spinner />;
  }
  return (
    <>
      {!expandView && (
        <div className="lbh-table-header">
          <h1 className="govuk-fieldset__legend--l gov-weight-lighter">
            {person.firstName} {person.lastName}
          </h1>

          {canUserEditPerson(user, person) && (
            <Link href={`/people/${person.id}/edit`}>
              <a className="govuk-link">Update person</a>
            </Link>
          )}
        </div>
      )}
      {showPersonDetails && (
        <PersonDetails person={person} expandView={expandView} />
      )}
      {typeof children === 'function' ? children(person) : children}
    </>
  );
};

export default PersonView;
