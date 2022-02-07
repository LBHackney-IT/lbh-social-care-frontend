import useWarnUnsavedChanges from 'hooks/useWarnUnsavedChanges';
import { useRef } from 'react';
import { PhoneNumber, Resident } from 'types';
import { useResident } from 'utils/api/residents';
import { DataRow } from './DataBlock';

interface Props extends DataRow {
  value: string | number;
  onClose: () => void;
  resident: Resident;
}

interface FormValues {
  phoneNumbers: PhoneNumber[];
}

const CustomPhoneNumberEditor = ({ resident }: Props): React.ReactElement => {
  const ref = useRef<HTMLFormElement>(null);
  const { register, handleSubmit, getValues, setValue, watch } = useForm();

  const { mutate } = useResident(resident.id);

  useWarnUnsavedChanges(true);

  return (
    <form>
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
