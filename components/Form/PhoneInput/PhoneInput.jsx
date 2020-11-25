import PropTypes from 'prop-types';
import cx from 'classnames';

import { TextInput } from '..';

const PhoneInput = (props) => (
  <div className={cx('govuk-form-group')}>
    <TextInput {...props} minLength="5" type="tel"></TextInput>
  </div>
);

PhoneInput.propTypes = {
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

export default PhoneInput;
