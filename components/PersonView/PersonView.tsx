import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import Spinner from 'components/Spinner/Spinner';
import PersonDetails from './PersonDetails';
import { useResident } from 'utils/api/residents';
import { Resident } from 'types';

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
        <h1 className="lbh-heading-h1 govuk-!-margin-bottom-8">
          {person.firstName} {person.lastName}
        </h1>
      )}
      {showPersonDetails && (
        <PersonDetails person={person} expandView={expandView} />
      )}
      {typeof children === 'function' ? children(person) : children}
    </>
  );
};

export default PersonView;
