import Dialog from 'components/Dialog/Dialog';
import { ExistingRelationship } from 'types';
import style from './RemoveRelationshipDialog.module.scss';

interface Props {
  isOpen: boolean;
  onDismiss: () => void;
  person?: ExistingRelationship;
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
      title={
        person
          ? `You are about to remove ${person.firstName} ${person.lastName}`
          : ''
      }
      isOpen={isOpen}
      onDismiss={onDismiss}
      aria-label="remove_relationship_dialog"
    >
      <p className="lbh-body">
        Are you sure you want to remove this relationship?
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
          No, do nothing
        </a>
      </div>
    </Dialog>
  );
};

export default RemoveRelationshipDialog;
