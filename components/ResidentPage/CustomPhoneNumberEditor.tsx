import useWarnUnsavedChanges from 'hooks/useWarnUnsavedChanges';
import { KeyboardEventHandler, useEffect, useRef } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { PhoneNumber, Resident } from 'types';
import { useResident } from 'utils/api/residents';
import { DataRow } from './DataBlock';
import s from './CustomPhoneNumberEditor.module.scss';

interface Props extends DataRow {
  onClose: () => void;
  resident: Resident;
}

interface FormValues {
  phoneNumbers: PhoneNumber[];
}

const CustomPhoneNumberEditor = ({
  onClose,
  resident,
}: Props): React.ReactElement => {
  const ref = useRef<HTMLFormElement>(null);
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      phoneNumbers:
        resident?.phoneNumbers?.length > 0
          ? resident.phoneNumbers
          : [
              {
                type: '',
                number: '',
              },
            ],
    },
  });
  const { append, remove, fields } = useFieldArray<PhoneNumber>({
    name: 'phoneNumbers',
    control,
  });

  const { mutate } = useResident(resident.id);

  useWarnUnsavedChanges(true);

  const onSubmit = async (data: FormValues) => {
    const res = await fetch(`/api/residents/${resident.id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
      body: JSON.stringify({
        ...resident,
        phoneNumbers: data?.phoneNumbers
          ?.filter((n) => n.type || n.number)
          ?.map((n) => ({
            ...n,
            number: n.number.replace(/\s/g, ''), // sanitise by removing spaces
          })),
      } as Resident),
    });
    mutate(); // give it a kick
    if (res.status === 200) {
      onClose();
    }
  };

  const handleKeyup: KeyboardEventHandler = (e) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'Enter') handleSubmit(onSubmit);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && e.target && !ref.current.contains(e.target as Node))
        onClose();
    };

    return () =>
      document.removeEventListener('click', handleClickOutside, true);
  }, [onClose]);

  return (
    <form
      className={s.form}
      onSubmit={handleSubmit(onSubmit)}
      onKeyUp={handleKeyup}
      ref={ref}
    >
      <fieldset>
        <legend className="govuk-visually-hidden">Phone numbers</legend>

        <datalist id="type-hints">
          <option value="Mobile">Mobile</option>
          <option value="Home">Home</option>
          <option value="Work/office">Work/office</option>
        </datalist>

        {fields.map((field, i) => (
          <div key={field.id} className={s.row}>
            <div>
              <label htmlFor={`phoneNumbers[${i}].type`}>Label</label>
              <input
                name={`phoneNumbers[${i}].type`}
                id={`phoneNumbers[${i}].type`}
                max="10"
                ref={register()}
                className="govuk-input lbh-input"
                list="type-hints"
                placeholder={i === 0 ? 'eg. Mobile' : ''}
                defaultValue={field.type}
              />
            </div>

            <div>
              <label htmlFor={`phoneNumbers[${i}].number`}>Number</label>
              <input
                name={`phoneNumbers[${i}].number`}
                id={`phoneNumbers[${i}].number`}
                max="15"
                ref={register()}
                className="govuk-input lbh-input"
                placeholder={i === 0 ? 'eg. 0777 777 7777' : ''}
                defaultValue={field.number}
              />
            </div>

            <button
              onClick={() => remove(i)}
              title="Remove this number"
              className="lbh-link"
              type="button"
            >
              Remove
            </button>
          </div>
        ))}
      </fieldset>

      <div className={s.secondaryActions}>
        <button
          type="button"
          onClick={() =>
            append({
              type: '',
              number: '',
            })
          }
          className="lbh-link"
        >
          + Add {fields.length === 0 ? 'first phone number' : 'another'}
        </button>
      </div>

      <div className={s.primaryActions}>
        <button type="button" onClick={onClose} title="Cancel">
          <span className="govuk-visually-hidden">Cancel</span>
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path
              d="M-0.0695801 1.88831L1.88856 -0.0698242L17.5538 15.5953L15.5955 17.5534L-0.0695801 1.88831Z"
              fill="#6F777B"
            />
            <path
              d="M15.5955 -0.0696411L17.5538 1.8885L1.88856 17.5536L-0.0695801 15.5955L15.5955 -0.0696411Z"
              fill="#6F777B"
            />
          </svg>
        </button>

        <button title="Save">
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

export default CustomPhoneNumberEditor;
