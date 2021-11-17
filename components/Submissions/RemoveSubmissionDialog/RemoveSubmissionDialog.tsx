import Dialog from 'components/Dialog/Dialog';
import style from './RemoveSubmissionDialog.module.scss';
import { Resident } from 'types';
import { Select, TextInput } from 'components/Form';

interface Props {
  isOpen: boolean;
  person: Resident;
  responseObject: any;
  onDismiss: () => void;
  onFormSubmit: () => void;
}

const RemoveSubmissionDialog = ({
  isOpen,
  person,
  responseObject,
  onDismiss,
  onFormSubmit,
}: Props): React.ReactElement => {
  {
    responseObject.reason_for_deletion = 'this is the reason';
  }

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
          responseObject.reason_for_deletion = String(value);
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
        defaultValue={''}
        onChange={(event) => {
          responseObject.name_of_requester = String(event.target.value);
        }}
        disabled={false}
      />

      <div className={style.actions}>
        <button onClick={onFormSubmit} className="govuk-button lbh-button">
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
