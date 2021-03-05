import { TextInput } from '..';

import type { TextInputNoType as Props } from 'components/Form/types';

const DateInput = (props: Props): React.ReactElement => (
  <TextInput width={10} {...props} type="date" />
);

export default DateInput;
