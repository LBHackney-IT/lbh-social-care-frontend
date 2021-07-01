import Search from 'components/Search/Search';
import Button from 'components/Button/Button';
import { useCallback, useState } from 'react';

interface Props {
  personId: number;
}

const AddRelationship = ({ personId }: Props): React.ReactElement => {
  const [otherPersonId, setOtherPersonId] = useState('');

  //use React context instead of props
  // see _app.tsx FeatureFlagComponent

  // lib/featureflags
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
        label="Choose relationship"
        route={`/people/${personId}/relationships/add/${otherPersonId}`}
        disabled={
          !otherPersonId ||
          otherPersonId === '' ||
          otherPersonId === personId.toString()
        }
      />
    </>
  );
};

export default AddRelationship;
