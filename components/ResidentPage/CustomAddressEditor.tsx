import { KeyboardEventHandler, useRef, useState } from 'react';
import { Resident, Address } from 'types';
import { useResident } from 'utils/api/residents';
import { DataRow } from './DataBlock';
import s from './CustomAddressEditor.module.scss';
import { Field, Form, Formik, FormikProps } from 'formik';
import { residentSchema } from 'lib/validators';
import { lookupPostcode } from 'utils/api/postcodeAPI';
import React from 'react';

const Error = ({ error }: { error?: string }) =>
  error ? (
    <span className={s.error} role="alert">
      {error.toString()}
    </span>
  ) : null;

interface Props extends DataRow {
  onClose: () => void;
  resident: Resident;
}

interface FormValues {
  numberSearch: string;
  postcodeSearch: string;
  addressDropdown?: string;
  address: {
    address: string;
    postcode: string;
    uprn: string;
  };
}

const CustomAddressEditor = (props: Props): React.ReactElement => {
  const { mutate } = useResident(props.resident.id);

  const handleSubmit = async (data: FormValues) => {
    const res = await fetch(`/api/residents/${props.resident.id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
      body: JSON.stringify({
        address: {
          address: data.address.address,
          postcode: data.address.postcode,
          uprn: parseInt(data.address.uprn),
        },
      }),
    });
    mutate(); // give it a kick
    if (res.status === 200) {
      props.onClose();
    }
  };

  return (
    <Formik
      initialValues={{
        numberSearch: '',
        postcodeSearch: '',
        address: {
          address: '',
          postcode: '',
          uprn: '',
          ...props.resident.address,
        },
      }}
      onSubmit={handleSubmit}
      validationSchema={residentSchema.pick(['address'])}
    >
      {(formikProps) => <InnerForm {...formikProps} {...props} />}
    </Formik>
  );
};

export default CustomAddressEditor;

type InnerProps = Props & FormikProps<FormValues>;

const InnerForm = ({
  resident,
  onClose,
  errors,
  touched,
  values,
  setFieldValue,
  submitForm,
}: InnerProps) => {
  const addressExists = !!(
    resident.address?.address || resident.address?.postcode
  );

  const ref = useRef<HTMLFormElement>(null);
  const [open, setOpen] = useState<boolean>(addressExists);
  const [dropdownAddresses, setDropdownAddresses] = useState<Address[]>();
  const [errorMessage, setErrorMessage] = useState<string>();

  const handleKeyup: KeyboardEventHandler = (e) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'Enter') submitForm();
  };

  const handleSearch = async () => {
    try {
      const { numberSearch, postcodeSearch } = values;

      let pageNumber = 0;
      let isLastPage = false;
      const addressData: Address[] = [];
      do {
        pageNumber++;
        try {
          const { address, page_count } = await lookupPostcode(
            postcodeSearch,
            pageNumber,
            numberSearch
          );
          address.length === 0
            ? setErrorMessage('No matching addresses were found.')
            : addressData.push(...address);
          if (page_count == pageNumber || address.length === 0)
            isLastPage = true;
        } catch (e) {
          isLastPage = true;
          setErrorMessage(
            'There was a problem retrieving addresses, please try again.'
          );
        }
      } while (!isLastPage);

      setDropdownAddresses(addressData);
      setOpen(true);
    } catch (e) {
      setOpen(true);
    }
  };

  const handleAddress = (data: string) => {
    const parsedAddress = JSON.parse(data);
    setFieldValue('address.address', parsedAddress.address);
    setFieldValue('address.postcode', parsedAddress.postcode);
    setFieldValue('address.uprn', parsedAddress.uprn);
  };

  const canSearch = values['postcodeSearch'];

  return (
    <Form className={s.form} onKeyUp={handleKeyup} ref={ref}>
      <label htmlFor="numberSearch">Building number or name</label>
      <Field
        name="numberSearch"
        id="numberSearch"
        max="30"
        className="govuk-input lbh-input govuk-input--width-5"
      />

      <label htmlFor="postcodeSearch">Postcode</label>
      <Field
        name="postcodeSearch"
        id="postcodeSearch"
        max="10"
        className="govuk-input lbh-input govuk-input--width-5"
      />

      <div className={s.secondaryActions}>
        <button
          type="button"
          onClick={handleSearch}
          className="lbh-link"
          disabled={!canSearch}
        >
          Find address
        </button>
        {!open && (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="lbh-link"
          >
            Enter manually
          </button>
        )}
      </div>
      {errorMessage && <Error error={errorMessage} />}
      {dropdownAddresses && !errorMessage && (
        <Field
          as="select"
          name="addressDropdown"
          id="addressDropdown"
          onChange={(e: { target: { value: string } }) =>
            handleAddress(e.target.value)
          }
          className={`govuk-select lbh-select`}
        >
          {dropdownAddresses?.map((address) => (
            <option
              value={JSON.stringify(address)}
              key={JSON.stringify(address)}
            >
              {' '}
              {address.address}
            </option>
          ))}
        </Field>
      )}

      {open && (
        <fieldset>
          <label htmlFor="address.address">Address</label>
          <Error
            error={
              touched?.address?.address ? errors.address?.address : undefined
            }
          />
          <Field
            name="address.address"
            id="address.address"
            placeholder="Address"
            className="govuk-input lbh-input"
          />

          <label htmlFor="address.postcode">Postcode</label>
          <Error
            error={
              touched?.address?.postcode ? errors.address?.postcode : undefined
            }
          />
          <Field
            name="address.postcode"
            id="address.postcode"
            placeholder="eg. E8 1EA"
            className="govuk-input lbh-input govuk-input--width-5"
          />

          <label htmlFor="address.uprn" className="govuk-visually-hidden">
            Unique property reference number
          </label>
          <p className="govuk-visually-hidden" id="uprn-hint">
            Also called UPRN
          </p>
          <Field
            name="address.uprn"
            id="address.uprn"
            aria-describedby="uprn-hint"
            className="govuk-visually-hidden"
          />
        </fieldset>
      )}

      <div className={s.primaryActions}>
        <button type="button" onClick={onClose} title="Cancel">
          <span className="govuk-visually-hidden">Cancel</span>
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path
              d="M-0.0695801 1.88831L1.88856 -0.0698242L17.5538 15.5953L15.5955 17.5534L-0.0695801 1.88831Z"
              fill="#6F777B"
            />
            <path
              d="M15.5955 -0.0696411L17.5538 1.8885L1.88856 17.5536L-0.0695801 15.5955L15.5955 -0.0696411Z"
              fill="#6F777B"
            />
          </svg>
        </button>

        <button title="Save">
          <span className="govuk-visually-hidden">Save</span>
          <svg width="24" height="19" viewBox="0 0 24 19">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M23.5608 3.06065L8.50011 18.1213L0.939453 10.5607L3.06077 8.43933L8.50011 13.8787L21.4395 0.939331L23.5608 3.06065Z"
              fill="#00664F"
            />
          </svg>
        </button>
      </div>
    </Form>
  );
};
