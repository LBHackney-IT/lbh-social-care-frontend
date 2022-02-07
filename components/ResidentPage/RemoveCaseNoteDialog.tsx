import Dialog from 'components/Dialog/Dialog';
import { useAuth } from 'components/UserContext/UserContext';
import { useRouter } from 'next/router';
import { useCases } from 'utils/api/cases';
import { deleteSubmission } from 'utils/api/submissions';

const DELETE_REASONS = [
  'Submitted prematurely',
  'Manager requested amendments',
  'Incorrect date',
  'Incorrect information/details (i.e, visit type selected incorrectly)',
  'Duplicate records',
  'Further information received',
  'Wrong person',
  'Client requested deletion',
];

interface Props {
  submissionId: string;
  isOpen: boolean;
  socialCareId: number;
  onClose: () => void;
}

const RemoveCaseNoteDialog = ({
  submissionId,
  socialCareId,
  isOpen,
  onClose,
}: Props): React.ReactElement => {
  const { user } = useAuth();
  const { mutate } = useCases({ mosaic_id: socialCareId });
  const { replace } = useRouter();

  const remove = async () => {
    if (user)
      await deleteSubmission(submissionId, DELETE_REASONS[3], user?.name);
    onClose(); // close this dialog
    mutate(); // give it a kick
    replace(window.location.pathname); // and close case note dialog
  };

  return (
    <Dialog
      title="Are you sure you want to remove this case note or record?"
      onDismiss={onClose}
      isOpen={isOpen}
    >
      <div className="lbh-dialog__actions">
        <button className="govuk-button lbh-button" onClick={remove}>
          Yes, remove
        </button>
        <button className="lbh-link" onClick={onClose}>
          No, do nothing
        </button>
      </div>
    </Dialog>
  );
};

export default RemoveCaseNoteDialog;
