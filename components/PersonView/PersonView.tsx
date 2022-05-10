import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import Spinner from 'components/Spinner/Spinner';
import { useResident } from 'utils/api/residents';
import { Resident } from 'types';
import PersonWidget from 'components/PersonWidget/PersonWidget';

interface Props {
  personId: number;
  children?: React.ReactChild | ((arg0: Resident) => React.ReactChild);
  expandView?: boolean;
  showPersonDetails?: boolean;
}

const PersonView = ({
  personId,
  children,
  showPersonDetails = true,
}: Props): React.ReactElement => {
  const { data: person, error } = useResident(personId);
  if (error) {
    return <ErrorMessage label={error.message} />;
  }
  if (!person) {
    return <Spinner />;
  }
  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        {typeof children === 'function' ? children(person) : children}
      </div>
      <div className="govuk-grid-column-one-third">
        <p className="lbh-body">This is for:</p>
        {showPersonDetails && <PersonWidget person={person} />}
      </div>
    </div>
  );
};

export default PersonView;
