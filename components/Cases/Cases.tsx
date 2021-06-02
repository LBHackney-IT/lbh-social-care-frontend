import CasesTable from 'components/Cases/CasesTable';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import ErrorSummary from 'components/ErrorSummary/ErrorSummary';
import Button from 'components/Button/Button';
import Spinner from 'components/Spinner/Spinner';
import { useAuth } from 'components/UserContext/UserContext';
import { useCasesByResident } from 'utils/api/cases';

import { Case, Resident, User } from 'types';
import { canManageCases } from '../../lib/permissions';

interface Props {
  id: number;
}

const Cases = ({ id }: Props): React.ReactElement => {
  const { data, size, setSize, error } = useCasesByResident(id);
  const results =
    data && data.length > 0
      ? {
          cases: data.reduce<Case[]>(
            (acc, { cases }) => [...acc, ...cases],
            []
          ),
          nextCursor: data[data.length - 1].nextCursor,
        }
      : null;
  if (error) {
    return <ErrorMessage />;
  }
  if (!data || !results) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }
  return (
    <>
      {results.cases.length > 0 ? (
        <CasesTable
          records={results.cases}
          columns={['date_of_event', 'formName', 'officer_email', 'action']}
        />
      ) : (
        <p className="govuk-body govuk-!-margin-top-5">Records not found</p>
      )}
      <div style={{ height: '50px', textAlign: 'center' }}>
        {size > data.length ? (
          <Spinner />
        ) : (
          results.nextCursor && (
            <Button label="load more" onClick={() => setSize(size + 1)} />
          )
        )}
      </div>
    </>
  );
};

interface WrapperProps {
  id: number;
  person: Resident;
}

const CasesWrapper = ({ id, person }: WrapperProps): React.ReactElement => {
  const { user } = useAuth() as { user: User };

  const userCanManageCases = canManageCases(user, person);

  return (
    <div>
      <div className="lbh-table-header">
        <div>
          <h3 className="govuk-fieldset__legend--m govuk-custom-text-color">
            RECORDS HISTORY
          </h3>
          <span className="govuk-body">Linked files are read only</span>
        </div>
        {userCanManageCases && (
          <Button label="Add a new record" route={`${id}/records`} />
        )}
      </div>
      <hr className="govuk-divider" />
      {userCanManageCases ? (
        <Cases id={id} />
      ) : (
        <ErrorSummary
          title="RESTRICTED"
          role="complementary"
          body="Some details for this person are restricted due to your permissions."
        />
      )}
    </div>
  );
};

export default CasesWrapper;
