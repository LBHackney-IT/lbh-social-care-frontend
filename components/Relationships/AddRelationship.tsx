import Search from 'components/Search/Search';
import Button from 'components/Button/Button';
import { useCallback, useState } from 'react';

interface Props {
  personId: number;
}

const AddRelationship = ({ personId }: Props): React.ReactElement => {
  const [otherPersonId, setOtherPersonId] = useState('');

  const callback = useCallback((value) => {
    setOtherPersonId(value);
  }, []);

  return (
    <>
      <Search
        type="relationship"
        subHeader={<>Search for a person by any combination of fields below</>}
        resultHeader={`SEARCH RESULT`}
        callback={callback}
      />
      <Button
        label="Add Relationship"
        route={`/people/${personId}/relationships/add?id=${encodeURIComponent(
          personId
        )}&otherPersonId=${encodeURIComponent(otherPersonId)}`}
        disabled={!otherPersonId || otherPersonId === ''}
      />
    </>
  );
};

export default AddRelationship;
