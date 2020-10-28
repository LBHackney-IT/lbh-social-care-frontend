import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Controller } from 'react-hook-form';
import isPostcodeValid from 'uk-postcode-validator';

import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { Button, Select, TextInput } from 'components/Form';
import { lookupPostcode } from 'utils/postcodeAPI';

const AddressBox = ({ name, disabled, register }) => (
  <>
    <TextInput
      label="First line"
      name={`${name}.firstLine`}
      register={register({ required: true })}
    />
    <TextInput
      label="Second line"
      name={`${name}.secondLine`}
      register={register}
      disabled={disabled}
    />
    <TextInput
      label="Third line"
      name={`${name}.thirdLine`}
      register={register}
      disabled={disabled}
    />
    <TextInput
      label="Postcode"
      name={`${name}.postcode`}
      register={register}
      disabled={disabled}
    />
    <TextInput
      label="Town"
      name={`${name}.ward`}
      register={register}
      disabled={disabled}
    />
    <TextInput
      label=""
      name={`${name}.uprn`}
      register={register}
      type="hidden"
    />
  </>
);

const AddressLookup = ({
  name,
  label,
  hint,
  control,
  register,
  defaultValue,
  error: { message: errorMessage } = {},
  supportManualEntry = true,
}) => {
  const inputRef = useRef();
  const [postcode, setPostcode] = useState(
    defaultValue && defaultValue.postcode
  );
  const [results, setResults] = useState([]);
  const [isManually, setIsManually] = useState();
  const [error, setError] = useState();
  return (
    <div>
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
          <div className="govuk-grid-column-one-third">
            <Button
              onClick={async () => {
                if (!isPostcodeValid(postcode)) {
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
              }}
              type="button"
              label="lookup"
            />
          </div>
          {supportManualEntry && (
            <div className="govuk-grid-column-one-third">
              <Button
                onClick={() => {
                  setIsManually(true);
                }}
                isSecondary
                type="button"
                label="or enter it manually"
              />
            </div>
          )}
        </div>
        {(error || errorMessage) && (
          <ErrorMessage label={error || errorMessage} />
        )}
        {(isManually || (defaultValue && results.length === 0)) && (
          <AddressBox name={name} disabled={!isManually} register={register} />
        )}
        {!isManually && (
          <Controller
            as={
              results.length > 0 ? (
                <Select
                  options={results.map((result) => ({
                    value: JSON.stringify(result.address),
                    text: result.addressText,
                  }))}
                  name={name}
                  label={label}
                  ignoreValue
                />
              ) : (
                <div />
              )
            }
            control={control}
            name={name}
            rules={{
              required: 'Address is required',
            }}
            onFocus={() => inputRef.current.focus()}
            onChange={([value]) => JSON.parse(value)}
          />
        )}
      </div>
    </div>
  );
};

AddressLookup.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default AddressLookup;
