import { useEffect, useRef, KeyboardEvent } from 'react';
import { useForm } from 'react-hook-form';
import { Resident } from 'types';
import s from './InlineEdit.module.scss';

interface Props {
  fieldName: string;
  value: string;
  onClose: () => void;
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
  const ref = useRef<HTMLFormElement>(null);
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

  const handleKeyup = (e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && e.target && !ref.current.contains(e.target as Node))
        onClose();
    };

    if (ref.current) {
      // move focus to input as soon as it appears
      ref.current.querySelector('input')?.focus();
      // handle outside clicks
      document.addEventListener('click', handleClickOutside, true);
    }

    return () =>
      document.removeEventListener('click', handleClickOutside, true);
  }, [onClose]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={s.form}
      onKeyUp={handleKeyup}
      ref={ref}
    >
      <label className="govuk-visually-hidden" htmlFor={fieldName}>
        Editing {fieldName}
      </label>

      <input name={fieldName} defaultValue={value} ref={register} {...props} />

      <div>
        <button type="button" onClick={onClose}>
          <span className="govuk-visually-hidden">Cancel</span>
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path
              d="M-0.0695801 1.88831L1.88856 -0.0698242L17.5538 15.5953L15.5955 17.5534L-0.0695801 1.88831Z"
              fill="#525A5B"
            />
            <path
              d="M15.5955 -0.0696411L17.5538 1.8885L1.88856 17.5536L-0.0695801 15.5955L15.5955 -0.0696411Z"
              fill="#525A5B"
            />
          </svg>
        </button>

        <button>
          <span className="govuk-visually-hidden">Save</span>
          <svg width="24" height="19" viewBox="0 0 24 19">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M23.5608 3.06065L8.50011 18.1213L0.939453 10.5607L3.06077 8.43933L8.50011 13.8787L21.4395 0.939331L23.5608 3.06065Z"
              fill="#00664F"
            />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default InlineEdit;
