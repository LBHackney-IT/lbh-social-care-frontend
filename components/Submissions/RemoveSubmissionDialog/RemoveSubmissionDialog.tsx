import Dialog from 'components/Dialog/Dialog';
import style from './RemoveSubmissionDialog.module.scss';
import { Resident } from 'types';
import { Select, TextInput } from 'components/Form';
import { useState } from 'react';

interface Props {
  isOpen: boolean;
  person: Resident;
  onDismiss: () => void;
  onFormSubmit: (data: any) => void;
}

const RemoveSubmissionDialog = ({
  isOpen,
  person,
  onDismiss,
  onFormSubmit,
}: Props): React.ReactElement => {
  const [reasonForDeletion, setReasonForDeletion] = useState<string>('');
  const [nameOfRequester, setNameOfRequester] = useState<string>('');

  const onDeleteButtonClick = () => {
    onFormSubmit({
      reason_for_deletion: reasonForDeletion,
      name_of_requester: nameOfRequester,
    });
  };

  return (
    <Dialog
      title={`Are you sure you want to delete this record?`}
      isOpen={isOpen}
      onDismiss={onDismiss}
      aria-label="remove_relationship_dialog"
    >
      <p className="lbh-body">
        You are about to delete the case note for
        <b>
          {person.firstName} {person.lastName} (#{person.id})
        </b>
        . This cannot be undone.
      </p>

      <Select
        label="Reason for deletion"
        id="Reason for deletion"
        name="reason_for_deletion"
        onChange={(value) => {
          setReasonForDeletion(value);
        }}
        options={[
          'Submitted prematurely',
          'Manager requested amendments',
          'Incorrect date',
          'Incorrect information/details (i.e, visit type selected incorrectly)',
          'Duplicate records',
          'Further information received',
          'Wrong person',
          'Client requested deletion',
        ]}
      />

      <TextInput
        label="Name of requester"
        name="name_of_requester"
        width={10}
        onChange={(event) => {
          setNameOfRequester(event.target.value);
        }}
      />

      <div className={style.actions}>
        <button
          onClick={onDeleteButtonClick}
          className="govuk-button lbh-button"
          disabled={reasonForDeletion == '' || nameOfRequester == ''}
        >
          Yes, remove
        </button>

        <a
          className="lbh-link lbh-link--no-visited-state"
          href="#"
          onClick={onDismiss}
        >
          Cancel
        </a>
      </div>
    </Dialog>
  );
};

export default RemoveSubmissionDialog;
