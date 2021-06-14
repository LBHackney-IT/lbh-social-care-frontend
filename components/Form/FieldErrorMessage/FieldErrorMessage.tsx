import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import { GenericField } from '../types';

const generateErrorMessage = (
  action = 'Enter',
  isSingular: boolean,
  error: Required<GenericField>['error'],
  label?: string
) => {
  if (error.message) {
    return error.message;
  }

  if (error.type === 'required') {
    if (!label) {
      return `${action} a value`;
    }

    const startsWithVowel = ['a', 'e', 'i', 'o', 'u'].includes(
      label.toLowerCase()[0]
    );

    return `${action} ${
      isSingular ? (startsWithVowel ? 'an' : 'a') : ''
    } ${label.toLowerCase()}`;
  }

  return undefined;
};

type Props = {
  action?: string;
  error?: Required<GenericField>['error'];
  label?: string;
  isSingular?: boolean;
};

export const FieldErrorMessage: React.FC<Props> = ({
  action,
  error,
  label,
  isSingular = true,
}: Props) => {
  if (!error) {
    return null;
  }

  const message = generateErrorMessage(action, isSingular, error, label);

  return <ErrorMessage label={message} />;
};
