import Search from 'components/Search/Search';
import Button from 'components/Button/Button';
import { useCallback } from 'react';

interface Props {
  personId: number;
}

const AddRelationship = ({ personId }: Props): React.ReactElement => {
  const getValueCallback = useCallback((value) => {
    console.log(value);
  }, []);

  return (
    <>
      <Search
        type="relationship"
        subHeader={'Search for a person by any combination of fields below'}
        resultHeader={`SEARCH RESULT`}
        columns={['first_name']}
        getValueCallback={getValueCallback}
      />
      <Button
        label="Add Relationship (tochange)"
        onClick={function () {
          console.log(personId);
        }}
      />
    </>
  );
};

export default AddRelationship;
