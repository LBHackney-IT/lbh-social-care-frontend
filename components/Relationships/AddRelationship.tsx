import Search from 'components/Search/Search';
import Button from 'components/Button/Button';
import { useCallback, useState } from 'react';

interface Props {
  personId: number;
}

const AddRelationship = ({ personId }: Props): React.ReactElement => {
  const [secondPersonId, setSecondPersonId] = useState('');
  const callback = useCallback((value) => {
    setSecondPersonId(value);
  }, []);

  return (
    <>
      <Search
        type="relationship"
        subHeader={'Search for a person by any combination of fields below'}
        resultHeader={`SEARCH RESULT`}
        columns={['first_name']}
        callback={callback}
      />
      <Button
        label="Add Relationship (tochange)"
        route={`addtype?id=${encodeURIComponent(
          personId
        )}&secondPersonId=${encodeURIComponent(secondPersonId)}`}
        disabled={!secondPersonId || secondPersonId === ''}
      />
    </>
  );
};

export default AddRelationship;
