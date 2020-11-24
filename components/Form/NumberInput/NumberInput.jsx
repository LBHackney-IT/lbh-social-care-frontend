import PropTypes from 'prop-types';
import cx from 'classnames';

import { TextInput } from '..';

const NumberInput = ({
  label,
  hint,
  name,
  register,
  error,
  inputClassName,
  required,
  width,
  ...otherProps
}) => (
  <div
    className={cx('govuk-form-group', {
      'govuk-form-group--error': error,
    })}
  >
    <TextInput
      label={label}
      name={name}
      hint={hint}
      register={register}
      error={error}
      inputClassName={inputClassName}
      required={required}
      width={width}
      type="number"
      otherProps={otherProps}
    ></TextInput>
  </div>
);

NumberInput.propTypes = {
  label: PropTypes.string,
  hint: PropTypes.string,
  name: PropTypes.string.isRequired,
  error: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }),
  inputClassName: PropTypes.string,
  register: PropTypes.func,
  required: PropTypes.bool,
  width: PropTypes.string,
};

export default NumberInput;
