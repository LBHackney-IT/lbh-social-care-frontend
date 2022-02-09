import axios from 'axios';
import useWarnUnsavedChanges from 'hooks/useWarnUnsavedChanges';
import { KeyboardEventHandler, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Resident } from 'types';
import { useResident } from 'utils/api/residents';
import { DataRow } from './DataBlock';
import s from './CustomAddressEditor.module.scss';

interface Props extends DataRow {
  onClose: () => void;
  resident: Resident;
}

interface FormValues {
  numberSearch: string;
  postcodeSearch: string;
  address: string;
  postcode: string;
  uprn: string;
}

const CustomAddressEditor = ({
  onClose,
  resident,
}: Props): React.ReactElement => {
  const addressExists = !!(
    resident.address?.address || resident.address?.postcode
  );

  const ref = useRef<HTMLFormElement>(null);
  const [open, setOpen] = useState<boolean>(addressExists);
  const { register, handleSubmit, getValues, setValue, watch } = useForm();

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
        address: {
          address: data.address,
          postcode: data.postcode,
          uprn: parseInt(data.uprn),
        },
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

  const handleSearch = async () => {
    try {
      const { numberSearch, postcodeSearch } = getValues([
        'numberSearch',
        'postcodeSearch',
      ]);

      const { data } = await axios.get(
        `/api/postcode/${postcodeSearch}?buildingNumber=${numberSearch}`
      );
      const result = data?.address?.[0];
      setValue('address', result['line1']);
      setValue('postcode', result['postcode']);
      setValue('uprn', result['UPRN']);
      setOpen(true);
    } catch (e) {
      setOpen(true);
    }
  };

  const canSearch = watch('postcodeSearch') && watch('numberSearch');

  return (
    <form
      className={s.form}
      onSubmit={handleSubmit(onSubmit)}
      onKeyUp={handleKeyup}
      ref={ref}
    >
      <label htmlFor="numberSearch">Building number or name</label>
      <input
        name="numberSearch"
        id="numberSearch"
        max="30"
        ref={register}
        className="govuk-input lbh-input govuk-input--width-5"
      />

      <label htmlFor="postcodeSearch">Postcode</label>
      <input
        name="postcodeSearch"
        id="postcodeSearch"
        max="10"
        ref={register}
        className="govuk-input lbh-input govuk-input--width-10"
      />

      {JSON.stringify()}

      <div className={s.secondaryActions}>
        <button
          type="button"
          onClick={handleSearch}
          className="lbh-link"
          disabled={!canSearch}
        >
          Find address
        </button>
        {!open && (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="lbh-link"
          >
            Enter manually
          </button>
        )}
      </div>

      {open && (
        <fieldset>
          <label htmlFor="address">Address</label>
          <input
            name="address"
            id="address"
            placeholder="Address"
            defaultValue={resident.address?.address}
            ref={register()}
            className="govuk-input lbh-input"
          />

          <label htmlFor="postcode">Postcode</label>
          <input
            name="postcode"
            id="postcode"
            ref={register()}
            placeholder="Postcode"
            defaultValue={resident.address?.postcode}
            className="govuk-input lbh-input govuk-input--width-10"
          />

          <label htmlFor="uprn">Unique property reference number</label>
          <p className={s.hint} id="uprn-hint">
            Also called UPRN
          </p>
          <input
            name="uprn"
            id="uprn"
            aria-describedby="uprn-hint"
            defaultValue={resident.address?.uprn}
            ref={register()}
            className="govuk-input lbh-input govuk-input--width-10"
          />
        </fieldset>
      )}

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

export default CustomAddressEditor;
