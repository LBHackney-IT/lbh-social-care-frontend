import { TextInput } from '..';

import type { PhoneInput as Props } from 'components/Form/types';

const PhoneInput = ({ rules, ...props }: Props): React.ReactElement => (
  <TextInput
    {...props}
    rules={{
      minLength: {
        value: 5,
        message: 'Invalid phone number',
      },
      ...rules,
    }}
    type="number"
  />
);

export default PhoneInput;
