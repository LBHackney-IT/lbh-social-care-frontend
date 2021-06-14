import {
  FieldArray,
  useFormikContext,
  FormikValues,
  FormikErrors,
  FormikTouched,
} from 'formik';
// import { Field } from 'data/flexibleForms/forms.types';
// import { generateInitialValues } from 'lib/utils';
import s from './TimetableField.module.scss';

interface Props {
  name: string;
  label: string;
  hint?: string;
}

const days = {
  Mon: 'Monday',
  Tue: 'Tuesday',
  Wed: 'Wednesday',
  Thur: 'Thursday',
  Fri: 'Friday',
  Sat: 'Saturday',
  Sun: 'Sunday',
  'Any day': 'Any day',
};

const times = ['Morning', 'Afternoon', 'Evening', 'Night', 'Any time'];

const TimetableField = ({ name, hint, label }: Props): React.ReactElement => {
  const {
    values,
    touched,
    errors,
  }: {
    values: FormikValues;
    errors: FormikErrors<FormikValues>;
    touched: FormikTouched<FormikValues>;
  } = useFormikContext();

  return (
    <div
      // see https://formik.org/docs/api/fieldarray#fieldarray-validation-gotchas
      className={`govuk-form-group lbh-form-group ${
        touched[name] &&
        errors[name] &&
        typeof errors[name] === 'string' &&
        'govuk-form-group--error'
      }`}
    >
      <fieldset
        className="govuk-fieldset"
        aria-describedby={hint && `${name}-hint`}
      >
        <legend className="govuk-label lbh-label">{label}</legend>

        {hint && (
          <span id={`${name}-hint`} className="govuk-hint lbh-hint">
            {hint}
          </span>
        )}

        {touched[name] && errors[name] && typeof errors[name] === 'string' && (
          <p className="govuk-error-message lbh-error-message" role="alert">
            <span className="govuk-visually-hidden">Error:</span>
            {errors[name]}
          </p>
        )}

        <FieldArray name={name}>
          {() => (
            <table className={`govuk-table lbh-table ${s.table}`}>
              <thead>
                <tr>
                  <td></td>
                  {Object.keys(days).map((day) => (
                    <th
                      className="govuk-table__header govuk-body-xs"
                      key={day}
                      scope="col"
                    >
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="govuk-table__body">
                {times.map((time) => (
                  <tr key={time} className="govuk-table__row">
                    <th
                      className="govuk-table__header govuk-body-xs"
                      scope="row"
                    >
                      {time}
                    </th>
                    {Object.keys(days).map((day) => (
                      <td className="govuk-table__cell" key={day}>
                        <input type="number" min="0" max="24" step="0.5" />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </FieldArray>
      </fieldset>

      <p>
        Total hours <strong>00</strong>
      </p>
    </div>
  );
};

export default TimetableField;
