import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { Button, TextInput } from 'components/Form';

import { getResident } from 'utils/api/residents';

const SearchByMosaicId = ({ onResult, setLoading }) => {
  const { register, errors, handleSubmit } = useForm({ defaultValues: {} });
  const onSubmit = async (formData) => {
    setLoading(true);
    onResult(getResident(formData.mosaicId));
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        label="Mosaic ID:"
        labelSize="s"
        name="mosaicId"
        placeholder="e.g. 1234567890"
        inputClassName="govuk-input--width-10"
        inputMode="numeric"
        error={errors.mosaicId}
        register={register({
          required: 'Mosaic ID is required',
          pattern: {
            value: /^[0-9]+$/,
            message: 'Mosaic ID must be a number',
          },
        })}
      />
      <Button label="Search" type="submit" />
    </form>
  );
};

SearchByMosaicId.propTypes = {
  onResult: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
};

export default SearchByMosaicId;
