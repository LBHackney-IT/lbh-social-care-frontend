import { KeyboardEventHandler, useRef } from 'react';
import { KeyContact, Resident } from 'types';
import { useResident } from 'utils/api/residents';
import { DataRow } from './DataBlock';
import s from './CustomPhoneNumberEditor.module.scss';
import { Field, FieldArray, Form, Formik, FormikProps, getIn } from 'formik';
import { residentSchema } from 'lib/validators';

interface Props extends DataRow {
  onClose: () => void;
  resident: Resident;
}

interface FormValues {
  keyContacts: KeyContact[];
}

const Error = ({ error }: { error?: string }) =>
  error ? (
    <span role="alert" className={s.error}>
      {error}
    </span>
  ) : null;

const CustomKeyContactsEditor = (props: Props): React.ReactElement => {
  const { mutate } = useResident(props.resident.id);

  const onSubmit = async (data: FormValues) => {
    const res = await fetch(`/api/residents/${props.resident.id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
      body: JSON.stringify({
        keyContacts: data?.keyContacts
          ?.filter((n) => n.name || n.email)
          .map((kc) => ({
            name: kc.name.trim(),
            email: kc.email.trim(),
          })),
      } as Resident),
    });
    mutate(); // give it a kick
    if (res.status === 200) {
      props.onClose();
    }
  };

  return (
    <Formik
      initialValues={{
        keyContacts:
          props.resident?.keyContacts && props.resident?.keyContacts?.length > 0
            ? props.resident.keyContacts
            : [
                {
                  name: '',
                  email: '',
                },
              ],
      }}
      validationSchema={residentSchema.pick(['keyContacts'])}
      onSubmit={onSubmit}
    >
      {(formikProps) => <InnerForm {...formikProps} {...props} />}
    </Formik>
  );
};

type InnerProps = Props & FormikProps<FormValues>;

const InnerForm = ({
  onClose,
  values,
  errors,
  submitForm,
  touched,
}: InnerProps): React.ReactElement => {
  const ref = useRef<HTMLFormElement>(null);
  const handleKeyup: KeyboardEventHandler = (e) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'Enter') submitForm();
  };

  return (
    <Form className={s.form} onKeyUp={handleKeyup} ref={ref}>
      <FieldArray name="keyContacts">
        {({ push, remove }) => (
          <>
            <fieldset>
              <legend className="govuk-visually-hidden">Key contacts</legend>

              {values?.keyContacts.map((field, i) => (
                <div key={i} className={s.row}>
                  <div>
                    <label htmlFor={`keyContacts[${i}].name`}>Their name</label>
                    <Error
                      error={
                        touched?.keyContacts?.[i]
                          ? getIn(errors, `keyContacts.${i}.name`)
                          : undefined
                      }
                    />
                    <Field
                      name={`keyContacts[${i}].name`}
                      id={`keyContacts[${i}].name`}
                      max="10"
                      className="govuk-input lbh-input"
                      placeholder={i === 0 ? 'eg. Namey McName' : ''}
                    />
                  </div>

                  <div>
                    <label htmlFor={`keyContacts[${i}].email`}>Email</label>
                    <Error
                      error={
                        touched?.keyContacts?.[i]
                          ? getIn(errors, `keyContacts.${i}.email`)
                          : undefined
                      }
                    />
                    <Field
                      name={`keyContacts[${i}].email`}
                      id={`keyContacts[${i}].email`}
                      max="15"
                      className="govuk-input lbh-input"
                      placeholder={i === 0 ? 'eg. example@email.com' : ''}
                    />
                  </div>

                  <button
                    onClick={() => remove(i)}
                    title="Remove this contact"
                    className="lbh-link"
                    type="button"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </fieldset>

            <div className={s.secondaryActions}>
              <button
                type="button"
                disabled={values.keyContacts.length > 3}
                onClick={() =>
                  push({
                    name: '',
                    email: '',
                  })
                }
                className="lbh-link"
              >
                + Add{' '}
                {values.keyContacts.length === 0 ? 'first contact' : 'another'}
              </button>
            </div>
          </>
        )}
      </FieldArray>

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

export default CustomKeyContactsEditor;
