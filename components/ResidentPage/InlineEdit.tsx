import { useForm } from 'react-hook-form';

interface Props {
  fieldName: string;
  value: string;
  onClose: () => void;
  endpoint: string;
}

interface FormValues {
  [fieldName: string]: string;
}

const InlineEdit = ({
  fieldName,
  value,
  onClose,
  endpoint,
  ...props
}: Props): React.ReactElement => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: FormValues) => {
    const res = await fetch(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
    if (res.status === 200) onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label className="govuk-visually-hidden" htmlFor={fieldName}>
        Editing {fieldName}
      </label>
      <input {...register(fieldName)} defaultValue={value} type="text" />
      <button type="button" onClick={onClose}>
        Cancel
      </button>
      <button>Save</button>
    </form>
  );
};

export default InlineEdit;
