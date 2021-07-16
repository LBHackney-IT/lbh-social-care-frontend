import Dialog from 'components/Dialog/Dialog';
import { Resident } from 'types';
import style from './RemoveRelationshipDialog.module.scss';

interface Props {
  isOpen: boolean;
  onDismiss: () => void;
  person: Resident;
  onFormSubmit: () => void;
}

const RemoveRelationshipDialog = ({
  person,
  isOpen,
  onDismiss,
  onFormSubmit,
}: Props): React.ReactElement => {
  return (
    <Dialog
      title={`You are about to remove ${person.firstName} ${person.lastName}`}
      isOpen={isOpen}
      onDismiss={onDismiss}
    >
      <p className="lbh-body">
        Are you sure you want to remove this relationship?
      </p>
      <p className="lbh-body">
        <u>
          This feature is currently under development and does not actually
          remove a relationship yet. It&apos;s not visible on production.
        </u>
      </p>
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

export default RemoveRelationshipDialog;
