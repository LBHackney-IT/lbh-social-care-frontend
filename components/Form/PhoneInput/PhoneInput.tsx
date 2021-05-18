import { TextInput } from '..';

import type { TextInputNoType as Props } from 'components/Form/types';

const PhoneInput = ({ rules, ...props }: Props): React.ReactElement => (
  <TextInput
    {...props}
    rules={{
      minLength: {
        value: 5,
        message: 'Invalid phone number',
      },
      // this should be removed when the BE
      // fix the inconsistencies in phone numbers
      pattern: {
        value: /^[\d]+$/,
        // value: /^\+?[\d]+$/,
        message: 'Only numbers are supported here',
      },
      ...rules,
    }}
    // this should be reenable when the BE
    // fix the inconsistencies in phone numbers
    // type="number"
  />
);

export default PhoneInput;
