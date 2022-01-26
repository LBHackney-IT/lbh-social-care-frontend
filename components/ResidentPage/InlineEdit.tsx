import { useForm } from 'react-hook-form';
import { Resident } from 'types';

interface Props {
  fieldName: string;
  value: string;
  onClose: () => void;
  endpoint: string;
  resident: Resident;
}

interface FormValues {
  [fieldName: string]: string;
}

const InlineEdit = ({
  fieldName,
  value,
  onClose,
  resident,
  ...props
}: Props): React.ReactElement => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: FormValues) => {
    const res = await fetch(`/api/residents/${resident.id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
      body: JSON.stringify({
        ...resident,
        ...data,
      }),
    });
    if (res.status === 200) {
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label className="govuk-visually-hidden" htmlFor={fieldName}>
        Editing {fieldName}
      </label>

      <input name={fieldName} defaultValue={value} ref={register} {...props} />

      <button type="button" onClick={onClose}>
        Cancel
      </button>

      <button>Save</button>
    </form>
  );
};

export default InlineEdit;
