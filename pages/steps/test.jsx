import { useForm } from 'react-hook-form';
import { Button } from 'components/Form';
import AddressLookup from 'components/AddressLookup/AddressLookup';

const TestForm = () => {
  const { register, errors, handleSubmit, control } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <AddressLookup
        name="address"
        label="address"
        control={control}
        error={errors.address}
        register={register}
      />
      <Button className="govuk-button" label="Next" type="submit" />
    </form>
  );
};

export default TestForm;
