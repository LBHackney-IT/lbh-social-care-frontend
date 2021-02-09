import { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

import CasesTable from 'components/Cases/CasesTable';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import ErrorSummary from 'components/ErrorSummary/ErrorSummary';
import Button from 'components/Button/Button';
import Spinner from 'components/Spinner/Spinner';
import { getCasesByResident } from 'utils/api/cases';

const Cases = ({ id, person }) => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState();
  const getPersonCases = useCallback(async (cursor) => {
    try {
      const data = await getCasesByResident(id, { cursor });
      setLoading(false);
      setError(false);
      setResults({
        ...data,
        cases: [...(results?.cases || []), ...data.cases],
      });
    } catch (e) {
      setLoading(false);
      setError(true);
    }
  });
  useEffect(() => {
    setLoading(true);
    getPersonCases();
  }, []);
  return (
    <>
      {loading ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <>
          <div className="lbh-table-header">
            <div>
              <h3 className="govuk-fieldset__legend--m govuk-custom-text-color govuk-!-margin-top-0">
                RECORDS HISTORY
              </h3>
              <p className="govuk-label  govuk-!-margin-top-0">
                Linked files are read only
              </p>
            </div>
            <Button label="Add a new record" route={`${id}/records`} />
          </div>
          <hr className="govuk-divider" />
          {person.restricted === 'Y' && (
            <ErrorSummary
              title="RESTRICTED"
              body="The records for this profile are restricted for viewing"
            />
          )}
          {results && person.restricted === 'N' && (
            <>
              {results?.cases.length > 0 ? (
                <CasesTable records={results.cases} />
              ) : (
                <p className="govuk-body govuk-!-margin-top-5">
                  Records not found
                </p>
              )}
            </>
          )}
          <div style={{ height: '50px', textAlign: 'center' }}>
            {loading ? (
              <Spinner />
            ) : (
              results?.nextCursor && (
                <Button
                  label="load more"
                  onClick={() => getPersonCases(results.nextCursor)}
                />
              )
            )}
          </div>
          {error && <ErrorMessage />}
        </>
      )}
    </>
  );
};

Cases.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Cases;
