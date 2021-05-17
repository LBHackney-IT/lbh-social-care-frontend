import AllocatedCasesTable from 'components/AllocatedCases/AllocatedCasesTable';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { useMyData } from 'utils/api/me';
import Spinner from 'components/Spinner/Spinner';

const MyAllocatedCases: React.FC = () => {
  const { data, error } = useMyData();
  if (error) {
    if (error?.response?.status === 404) {
      return (
        <p className="govuk-body govuk-!-margin-top-5">
          No people are assigned to you
        </p>
      );
    }
    return <ErrorMessage />;
  }
  if (!data) {
    return <Spinner />;
  }
  return (
    <>
      {data.allocations && (
        <>
          {data.allocations?.length > 0 ? (
            <>
              <p>
                Displaying ({data.allocations.length}){' '}
                {data.allocations.length > 1 ? 'allocations' : 'allocation'}
              </p>
              <AllocatedCasesTable cases={data.allocations} />
            </>
          ) : (
            <p className="govuk-body govuk-!-margin-top-5">
              No people are assigned to you
            </p>
          )}
        </>
      )}
    </>
  );
};

export default MyAllocatedCases;
