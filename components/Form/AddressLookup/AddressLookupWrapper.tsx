import AddressLookup from './AddressLookup';
import { useForm } from 'react-hook-form';

interface AddressLookupWrapperProps {
  postcode: string;
  buildingNumber: string;
  name: string;
  label: string;
  hint: string;
}

const AddressLookupWrapper = ({
  postcode,
  buildingNumber,
  name,
  label,
  hint,
}: AddressLookupWrapperProps): React.ReactElement => {
  const { control } = useForm();
  control.defaultValuesRef.current['name'] = {
    postcode: postcode,
    buildingNumber: buildingNumber,
  };

  return (
    <AddressLookup
      name={name}
      label={label}
      hint={hint}
      control={control}
      error={{}}
      supportManualEntry={true}
      rules={{}}
      required={true}
    />
  );
};

export default AddressLookupWrapper;
