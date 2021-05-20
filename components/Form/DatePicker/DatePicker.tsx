import { TextInput } from '..';
import { TextInputNoType } from 'components/Form/types';
import { format } from 'date-fns';

interface Props extends TextInputNoType {
  defaultToday?: boolean;
}

const DateInput = ({ defaultToday, ...props }: Props): React.ReactElement => (
  <TextInput
    width={10}
    {...props}
    type="date"
    defaultValue={defaultToday ? format(new Date(), 'yyyy-MM-dd') : undefined}
  />
);

export default DateInput;
