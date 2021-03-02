import { Story } from '@storybook/react';

import ObjectInput, { DynamicComponent } from './ObjectInput';

import { useForm } from 'react-hook-form';
import Button from 'components/Button/Button';

export default {
  title: 'Form Components/ObjectInput',
  component: ObjectInput,
};

const Template: Story<DynamicComponent> = (args) => {
  const { register, errors, handleSubmit } = useForm();
  const onSubmit = (data: Record<string, unknown>) => {
    alert(JSON.stringify(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ObjectInput
        label="Phone Number"
        register={register}
        {...args}
        name="phone_number"
        errors={errors}
      />
      <Button className="govuk-button" label="Next" type="submit" />
    </form>
  );
};

export const Default = Template.bind({});
Default.args = {
  components: [
    {
      component: 'PhoneInput',
      name: 'phoneNumber',
      label: 'Phone number',
      rules: { required: true },
    },
    {
      component: 'TextInput',
      name: 'phoneType',
      label: 'Phone type',
    },
  ],
};

export const InLine = Template.bind({});
InLine.args = {
  ...Default.args,
  isInline: true,
};

export const MultiComponent = Template.bind({});
MultiComponent.args = {
  isInline: true,
  components: [
    {
      component: 'TextInput',
      name: 'first',
      label: 'First',
    },
    {
      component: 'TextInput',
      name: 'second',
      label: 'Second',
    },
    {
      component: 'TextInput',
      name: 'third',
      label: 'Third',
    },
    {
      component: 'TextInput',
      name: 'fourth',
      label: 'Fourth',
    },
    {
      component: 'TextInput',
      name: 'fifth',
      label: 'Fifth',
    },
  ],
};
