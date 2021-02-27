import { Story } from '@storybook/react';

import AddressLookup from './AddressLookup';

import { useForm } from 'react-hook-form';
import Button from 'components/Button/Button';

export default {
  title: 'Form Components/AddressLookup',
  component: AddressLookup,
};

export const Default: Story = () => {
  const { register, errors, handleSubmit, control } = useForm();
  const onSubmit = (data: Record<string, unknown>) => {
    alert(JSON.stringify(data));
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
