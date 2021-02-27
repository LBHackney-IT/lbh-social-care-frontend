import { TextInput } from '..';

import type { TextInputNoType as Props } from 'components/Form/types';

const NumberInput = (props: Props): React.ReactElement => (
  <TextInput {...props} type="number" />
);

export default NumberInput;
