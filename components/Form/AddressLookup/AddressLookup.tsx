import { useState, useCallback, useRef } from 'react';
import cx from 'classnames';
import { Controller, Control } from 'react-hook-form';
import isPostcodeValid from 'uk-postcode-validator';

import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { Select, TextInput } from 'components/Form';
import Button from 'components/Button/Button';
import { lookupPostcode } from 'utils/api/postcodeAPI';
import { allNumeric } from 'utils/allNumericInputs';
import Spinner from 'components/Spinner/Spinner';

import { Address } from 'types';
import { AddressLookup as IAddressLookup } from 'components/Form/types';

interface AddressBox {
  name: string;
  onChange: (arg0: {
    uprn: null;
    address?: string;
    postcode?: string;
    buildingNumber?: string;
  }) => void;
  value: {
    address: string;
    postcode: string;
    buildingNumber: string;
  };
  disabled: boolean;
}

interface Props extends IAddressLookup {
  control: Control;
}

export const defaultValidation = ({
  required = false,
}: IAddressLookup['rules'] = {}): {
  address: (
    arg0?: Partial<AddressBox['value']>
  ) => true | 'You must enter an address';
  postcode: (
    arg0?: Partial<AddressBox['value']>
  ) => true | 'You must enter a valid postcode';
  buildingNumber: (
    arg0?: Partial<AddressBox['value']>
  ) => true | 'Building number must use valid characters (0-9)';
} => ({
  address: (value) =>
    !required ||
    (value?.address?.length && value.address.length > 0) ||
    'You must enter an address',
  postcode: (value) =>
    (!required && (value?.postcode === '' || !value?.postcode)) ||
    (value?.postcode && isPostcodeValid(value?.postcode)) ||
    'You must enter a valid postcode',
  buildingNumber: (value) =>
    !required ||
    (value?.buildingNumber?.length &&
      value.buildingNumber.length > 0 &&
      allNumeric(value.buildingNumber)) ||
    'Building number must use valid characters (0-9)',
});

const AddressBox = ({ name, disabled, value, onChange }: AddressBox) => {
  const [address, setAddress] = useState(value || {});
  const setNewAddress = useCallback(
    (inputName) =>
      ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
        const newAddress = { ...address, uprn: null, [inputName]: value };
        setAddress(newAddress);
        onChange(newAddress);
      },
    [address, onChange]
  );

  return (
    <div className="govuk-!-margin-top-5">
      <TextInput
        label="Address"
        width={30}
        name={`${name}.address`}
        defaultValue={address.address}
        onChange={setNewAddress('address')}
        disabled={disabled}
      />
      {!disabled && (
        <TextInput
          label="Postcode"
          name={`${name}.postcode`}
          width={10}
          defaultValue={address.postcode}
          onChange={setNewAddress('postcode')}
          disabled={disabled}
        />
      )}
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
  required,
  rules,
}: Props): React.ReactElement => {
  const inputRef = useRef<HTMLInputElement>(null);
  const buildingNumRef = useRef<HTMLInputElement>(null);
  const defaultValue = control.defaultValuesRef.current[name];
  const [postcode, setPostcode] = useState(
    defaultValue && defaultValue.postcode
  );
  const [buildingNumber, setBuildingNumber] = useState('');
  const [results, setResults] = useState<Address[]>([]);
  const [isManually, setIsManually] = useState<boolean>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);

  const searchPostcode = useCallback(async () => {
    control.setValue(`address`, null);
    if (!postcode || !isPostcodeValid(postcode)) {
      setError('You entered an invalid postcode.');
      return;
    }
    if (
      buildingNumber?.length > 0 &&
      buildingNumber !== '' &&
      !allNumeric(buildingNumber)
    ) {
      setError('Building number must use valid characters (0-9)');
      return;
    }

    setLoading(true);
    setIsManually(false);
    setError(undefined);
    setResults([]);
    let page_number = 1;
    let isLastPage = false;
    const matchingAddresses: Address[] = [];
    let errorMessage;

    do {
      try {
        const { address, page_count } = await lookupPostcode(
          postcode,
          page_number,
          buildingNumber
        );

        address.length === 0
          ? (errorMessage = 'There was a problem with the postcode.')
          : matchingAddresses?.push(...address);
        page_number === page_count ? (isLastPage = true) : page_number++;
      } catch {
        errorMessage = 'There was a problem with the postcode.';
      }
    } while (!errorMessage && !isLastPage);
    if (errorMessage) {
      setError(errorMessage);
    } else if (matchingAddresses) {
      setResults(matchingAddresses);
    }
    setLoading(false);
  }, [control, postcode, buildingNumber]);

  return (
    <div
      className={cx('lbh-form-group govuk-form-group', {
        'govuk-form-group--error': Boolean(error || errorMessage),
      })}
    >
      <label className="lbh-label govuk-label--m" htmlFor="postcode">
        {label} {required && <span className="govuk-required">*</span>}
      </label>
      {hint && (
        <span id={`${name}-hint`} className="govuk-hint">
          {hint}
        </span>
      )}
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-one-third">
          <input
            className={cx('lbh-input govuk-input', {
              'govuk-input--error': Boolean(error),
            })}
            id="buildingNumber"
            name="building-number"
            type="text"
            placeholder="Building Number (Optional)"
            onChange={(e) => setBuildingNumber(e.target.value)}
            ref={buildingNumRef}
          />
          <input
            className={cx(
              'lbh-input govuk-input',
              {
                'govuk-input--error': Boolean(error),
              },
              'govuk-!-margin-top-5'
            )}
            id="postcode"
            name="postal-code"
            type="text"
            placeholder="Postcode"
            onChange={(e) => setPostcode(e.target.value)}
            ref={inputRef}
          />
        </div>
      </div>
      <div className="govuk-grid-column-two-third">
        <Button
          className="govuk-!-margin-bottom-0 govuk-!-margin-right-1"
          onClick={searchPostcode}
          type="button"
          label="Look up"
          disabled={loading}
          id="lookup-button"
        />
        {supportManualEntry && (
          <Button
            className="govuk-!-margin-bottom-0"
            onClick={() => setIsManually(true)}
            isSecondary
            type="button"
            label="Or enter it manually"
          />
        )}
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
          ) : (
            <></>
          )
        }
        control={control}
        name={name}
        rules={{
          ...rules,
          validate: {
            ...defaultValidation(rules),
            ...rules?.validate,
          },
        }}
        defaultValue={control.defaultValuesRef.current[name] || null}
        onFocus={() => inputRef.current?.focus()}
      />
      {(error || errorMessage) && (
        <ErrorMessage
          className="govuk-!-margin-top-5"
          label={error || errorMessage}
        />
      )}
      {loading && (
        <div className="govuk-!-margin-top-5 govuk-grid-column-one-third">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default AddressLookup;
