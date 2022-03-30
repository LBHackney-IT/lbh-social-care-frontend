import { Field, Form, Formik } from 'formik';
import useClickOutside from 'hooks/useClickOutside';
import useWarnUnsavedChanges from 'hooks/useWarnUnsavedChanges';
import { residentSchema } from 'lib/validators';
import { useRef, KeyboardEvent } from 'react';
import { Resident } from 'types';
import { useResident } from 'utils/api/residents';
import { DataRow, SupportedData } from './DataBlock';
import s from './InlineEditor.module.scss';

export interface InlineEditorOption {
  label: string;
  value?: string | number;
}

export interface InlineEditorProps extends DataRow {
  value: string | number;
  onClose: () => void;
  resident: Resident;
}

interface FormValues {
  [name: string]: string;
}

const InlineEditor = ({
  onClose,
  resident,
  options,
  name,
  type,
  beforeEdit,
  beforeSave,
  multiple,
}: InlineEditorProps): React.ReactElement => {
  const ref = useRef<HTMLFormElement>(null);

  const schema = residentSchema.pick([name]);

  const { mutate } = useResident(resident.id);

  useWarnUnsavedChanges(true);
  useClickOutside(ref, onClose);

  const handleSubmit = async (data: FormValues) => {
    const res = await fetch(`/api/residents/${resident.id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
      body: JSON.stringify({
        [name]: beforeSave ? beforeSave(data[name]) : data[name],
      }),
    });
    mutate(); // give it a kick
    if (res.status === 204) {
      onClose();
    }
  };

  const handleKeyup = (e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    // if (e.key === 'Enter') handleSubmit();
  };

  let defaultValue: SupportedData = '';

  if (options) {
    if (multiple) {
      defaultValue = [];
    } else {
      defaultValue = options[0].value || options[0].label;
    }
  }

  const existingValue = resident[name as keyof Resident] as SupportedData;

  if (existingValue || typeof existingValue === 'boolean') {
    if (beforeEdit) {
      defaultValue = beforeEdit(existingValue);
    } else {
      defaultValue = existingValue;
    }
  }

  return (
    <Formik
      initialValues={
        {
          [name]: defaultValue,
        } as FormValues
      }
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
      {({ errors }) => (
        <Form
          className={multiple ? s.multipleForm : s.form}
          onKeyUp={handleKeyup}
          ref={ref}
        >
          {multiple ? (
            <fieldset className="govuk-fieldset govuk-checkboxes govuk-checkboxes--small lbh-checkboxes">
              <legend className="govuk-visually-hidden"> Editing {name}</legend>
              {options?.map((opt) => (
                <div
                  key={opt.value || opt.label}
                  className="govuk-checkboxes__item"
                >
                  <Field
                    type="checkbox"
                    className="govuk-checkboxes__input"
                    id={`${name}-${opt.value || opt.label}`}
                    name={name}
                    value={opt.value || opt.label}
                  />
                  <label
                    className="govuk-checkboxes__label"
                    htmlFor={`${name}-${opt.value || opt.label}`}
                  >
                    {opt.label}
                  </label>
                </div>
              ))}
            </fieldset>
          ) : (
            <>
              <label className="govuk-visually-hidden" htmlFor={name}>
                Editing {name}
              </label>

              {options ? (
                <Field as="select" id={name} name={name}>
                  {options.map((opt) => (
                    <option
                      key={opt.value || opt.label}
                      value={
                        typeof opt.value === 'string' ? opt.value : opt.label
                      }
                    >
                      {opt.label}
                    </option>
                  ))}
                </Field>
              ) : (
                <Field id={name} name={name} type={type} />
              )}
            </>
          )}
          {errors[name] && (
            <p className={s.error} role="alert">
              {errors[name]?.toString()}
            </p>
          )}
          <div>
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
      )}
    </Formik>
  );
};

export default InlineEditor;
