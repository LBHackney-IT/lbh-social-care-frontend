import Dialog from 'components/Dialog/Dialog';
import SearchBox from 'components/SubmissionsTable/SearchBox';
import { useAuth } from 'components/UserContext/UserContext';
import useSearch from 'hooks/useSearch';
import { useState } from 'react';
import { Resident, User } from 'types';
import s from './AddFormDialog.module.scss';

interface Props {
  isOpen: boolean;
  onDismiss: () => void;
  person: Resident;
}

const AddFormDialog = ({
  person,
  isOpen,
  onDismiss,
}: Props): React.ReactElement => {
  // let serviceContext =

  const [searchQuery, setSearchQuery] = useState<string>('');
  //   const results = useSearch();

  return (
    <Dialog title="Add something new" isOpen={isOpen} onDismiss={onDismiss}>
      {/* {contextFlag} */}
      <div>
        <SearchBox
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          label="Search for a form"
          placeholder="Search forms..."
        />
      </div>
      <ul className={s.resultsList}>
        {/* {results.map(result => <li></li>)} */}
      </ul>
    </Dialog>
  );
};

export default AddFormDialog;
