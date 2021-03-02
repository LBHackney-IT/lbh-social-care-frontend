import { TextInput } from '..';

import type { TextInputNoType as Props } from 'components/Form/types';

const EmailInput = (props: Props): React.ReactElement => (
  <TextInput {...props} type="email" />
);

export default EmailInput;
