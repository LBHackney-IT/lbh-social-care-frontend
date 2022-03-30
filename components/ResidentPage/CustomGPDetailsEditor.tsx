import useWarnUnsavedChanges from 'hooks/useWarnUnsavedChanges';
import { KeyboardEventHandler, useRef } from 'react';
import { GPDetails, Resident } from 'types';
import { useResident } from 'utils/api/residents';
import { DataRow } from './DataBlock';
import s from './CustomAddressEditor.module.scss';
import { Field, Form, Formik, FormikProps } from 'formik';
import { residentSchema } from 'lib/validators';
import useClickOutside from 'hooks/useClickOutside';

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
  gpDetails: GPDetails;
}

const CustomGPDetailsEditor = (props: Props): React.ReactElement => {
  const { mutate } = useResident(props.resident.id);

  useWarnUnsavedChanges(true);

  const handleSubmit = async (data: FormValues) => {
    const res = await fetch(`/api/residents/${props.resident.id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
      body: JSON.stringify({
        gpDetails: data.gpDetails,
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
        gpDetails: {
          name: '',
          address: '',
          postcode: '',
          email: '',
          phoneNumber: '',
          ...props.resident.gpDetails,
        },
      }}
      onSubmit={handleSubmit}
      validationSchema={residentSchema.pick(['gpDetails'])}
    >
      {(formikProps) => <InnerForm {...formikProps} {...props} />}
    </Formik>
  );
};

export default CustomGPDetailsEditor;

type InnerProps = Props & FormikProps<FormValues>;

const InnerForm = ({ onClose, errors, touched, submitForm }: InnerProps) => {
  const ref = useRef<HTMLFormElement>(null);

  useClickOutside(ref, onClose);

  const handleKeyup: KeyboardEventHandler = (e) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'Enter') submitForm();
  };

  return (
    <Form className={s.form} onKeyUp={handleKeyup} ref={ref}>
      <label htmlFor="gpDetails.name">GP or practice name</label>
      <Error
        error={touched?.gpDetails?.name ? errors.gpDetails?.name : undefined}
      />
      <Field
        name="gpDetails.name"
        id="gpDetails.name"
        max="30"
        className="govuk-input lbh-input govuk-input--width-20"
      />

      <label htmlFor="gpDetails.address">Address</label>
      <Error
        error={
          touched?.gpDetails?.address ? errors.gpDetails?.address : undefined
        }
      />
      <Field
        name="gpDetails.address"
        id="gpDetails.address"
        className="govuk-input lbh-input govuk-input--width-20"
      />

      <label htmlFor="gpDetails.postcode">Postcode</label>
      <Error
        error={
          touched?.gpDetails?.postcode ? errors.gpDetails?.postcode : undefined
        }
      />
      <Field
        name="gpDetails.postcode"
        id="gpDetails.postcode"
        placeholder="eg. E8 1EA"
        className="govuk-input lbh-input govuk-input--width-5"
      />

      <label htmlFor="gpDetails.phoneNumber">Phone</label>
      <Error
        error={
          touched?.gpDetails?.phoneNumber
            ? errors.gpDetails?.phoneNumber
            : undefined
        }
      />
      <Field
        name="gpDetails.phoneNumber"
        id="gpDetails.phoneNumber"
        className="govuk-input lbh-input govuk-input--width-10"
      />

      <label htmlFor="gpDetails.email">Email</label>
      <Error
        error={touched?.gpDetails?.email ? errors.gpDetails?.email : undefined}
      />
      <Field
        name="gpDetails.email"
        id="gpDetails.email"
        className="govuk-input lbh-input govuk-input--width-10"
      />

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
