import { useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Controller } from 'react-hook-form';
import isPostcodeValid from 'uk-postcode-validator';

import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { Button, Select, TextInput } from 'components/Form';
import { lookupPostcode } from 'utils/postcodeAPI';

const AddressBox = ({ name, disabled, value, onChange }) => {
  const [address, setAddress] = useState(value || {});
  const setNewAddress = useCallback((inputName) => ({ target: { value } }) => {
    const newAddress = { ...address, uprn: null, [inputName]: value };
    setAddress(newAddress);
    onChange(newAddress);
  });
  return (
    <div className="govuk-!-margin-top-5">
      <TextInput
        label="Address"
        name={`${name}.address`}
        defaultValue={address.address}
        onChange={setNewAddress('address')}
        disabled={disabled}
      />
      <TextInput
        label="Postcode"
        name={`${name}.postcode`}
        width="10"
        defaultValue={address.postcode}
        onChange={setNewAddress('postcode')}
        disabled={disabled}
      />
    </div>
  );
};

const AddressLookup = ({
  name,
  label,
  hint,
  control,
  error: { message: errorMessage } = {},
  supportManualEntry = true,
  rules,
}) => {
  const inputRef = useRef();
  const defaultValue = control.defaultValuesRef.current[name];
  const [postcode, setPostcode] = useState(
    defaultValue && defaultValue.postcode
  );
  const [results, setResults] = useState([]);
  const [isManually, setIsManually] = useState();
  const [error, setError] = useState();
  const searchPostcode = useCallback(async () => {
    control.setValue(`address`, null);
    if (!postcode || !isPostcodeValid(postcode)) {
      setError('You entered an invalid postcode.');
      return;
    }
    setIsManually(false);
    setError(null);
    setResults([]);
    try {
      const res = await lookupPostcode(postcode);
      res.length === 0
        ? setError('There was a problem with the postcode.')
        : setResults(res);
    } catch {
      setError('There was a problem with the postcode.');
    }
  });
  return (
    <div
      className={cx('govuk-form-group', {
        'govuk-form-group--error': Boolean(error || errorMessage),
      })}
    >
      <label className="govuk-label govuk-label--m" htmlFor="postcode">
        {label}
      </label>
      {hint && (
        <span id={`${name}-hint`} className="govuk-hint">
          {hint}
        </span>
      )}
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-one-third">
          <input
            className={cx('govuk-input', {
              'govuk-input--error': Boolean(error),
            })}
            id="postcode"
            name="postal-code"
            type="text"
            placeholder="Postcode"
            onChange={(e) => setPostcode(e.target.value)}
            ref={inputRef}
          />
        </div>
        <div className="govuk-grid-column-two-third">
          <Button
            className="govuk-!-margin-bottom-0 govuk-!-margin-right-1"
            onClick={searchPostcode}
            type="button"
            label="lookup"
          />
          {supportManualEntry && (
            <Button
              className="govuk-!-margin-bottom-0"
              onClick={() => {
                setIsManually(true);
                control.setValue(`address`, null);
              }}
              isSecondary
              type="button"
              label="or enter it manually"
            />
          )}
        </div>
      </div>
      <Controller
        render={({ onChange, value, name }) =>
          !isManually && results.length > 0 ? (
            <div className="govuk-!-margin-top-5">
              <Select
                options={results.map((result) => ({
                  value: JSON.stringify(result),
                  text: result.address,
                }))}
                name={name}
                onChange={(value) => onChange(JSON.parse(value))}
                rules={rules}
                ignoreValue
              />
            </div>
          ) : isManually || (value && results.length === 0) ? (
            <AddressBox
              name={name}
              disabled={!isManually && value.uprn}
              value={value}
              onChange={(value) => onChange(value)}
            />
          ) : null
        }
        control={control}
        name={name}
        rules={{
          ...rules,
          validate: {
            address: (value) =>
              !rules?.required ||
              value?.address.length > 0 ||
              'You must enter an address',
            postcode: (value) =>
              !rules?.required ||
              (value?.postcode && isPostcodeValid(value.postcode)) ||
              'You must enter a valid postcode',
            ...rules?.validate,
          },
        }}
        onFocus={() => inputRef.current.focus()}
      />
      {(error || errorMessage) && (
        <ErrorMessage
          className="govuk-!-margin-top-5"
          label={error || errorMessage}
        />
      )}
    </div>
  );
};

AddressLookup.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default AddressLookup;
