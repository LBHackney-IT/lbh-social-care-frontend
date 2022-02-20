import { Field, useFormikContext } from 'formik';
import { SearchDomain, SearchParams } from 'pages/search';
import s from './Filters.module.scss';

interface RadioProps {
  name: string;
  label: string;
  value: string;
}

const Radio = ({ name, label, value }: RadioProps) => {
  return (
    <div className="govuk-radios__item">
      <Field
        className="govuk-radios__input"
        id={`${name}-~-${value}`}
        type="radio"
        name={name}
        value={value}
      />
      <label
        className="govuk-label govuk-radios__label"
        htmlFor={`${name}-~-${value}`}
      >
        {label}
      </label>
    </div>
  );
};

const Filters = (): React.ReactElement => {
  const { errors, values, touched } = useFormikContext<SearchParams>();

  return (
    <aside className={s.aside}>
      <div className="govuk-form-group lbh-form-group">
        <fieldset className="govuk-fieldset">
          <legend className="lbh-heading-h5">What to search</legend>
          <div className="govuk-radios lbh-radios">
            <Radio name="domain" label="Everything" value="" />
            <Radio
              name="domain"
              label="Residents"
              value={SearchDomain.Residents}
            />
            <Radio
              name="domain"
              label="Workflows"
              value={SearchDomain.Workflows}
            />
            <Radio
              name="domain"
              label="Case notes"
              value={SearchDomain.CaseNotes}
            />
          </div>
        </fieldset>

        <fieldset className="govuk-fieldset">
          <legend className="govuk-visually-hidden">Social care ID</legend>

          <label
            className="lbh-heading-h5 govuk-!-margin-top-0 govuk-!-margin-bottom-3"
            htmlFor="socialCareId"
          >
            Social care ID
          </label>
          <Field
            name="socialCareId"
            className="govuk-input lbh-input govuk-input--width-5"
            id="socialCareId"
            placeholder="eg. 1234"
          />
        </fieldset>

        <fieldset className="govuk-fieldset">
          <legend className="lbh-heading-h5">Added between</legend>

          <div className={s.addedBetween}>
            <div>
              <label className="govuk-label lbh-label" htmlFor="addedAfter">
                From
              </label>
              <Field
                type="date"
                name="addedAfter"
                className="govuk-input lbh-input"
                id="addedAfter"
              />
            </div>
            <div>
              <label className="govuk-label lbh-label" htmlFor="addedBefore">
                To
              </label>
              <Field
                type="date"
                name="addedBefore"
                className="govuk-input lbh-input"
                id="addedBefore"
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="govuk-fieldset">
          <legend className="lbh-heading-h5">Added by</legend>
          <div className="govuk-radios lbh-radios">
            <Radio name="addedByQuickOpt" label="Everyone" value="" />
            <Radio name="addedByQuickOpt" label="Me" value="foo" />
            <Radio
              name="addedByQuickOpt"
              label="Another user"
              value="another-user"
            />

            {values['addedByQuickOpt'] === 'another-user' && (
              <div
                className="govuk-radios__conditional"
                id="conditional-how-contacted"
              >
                <label className="lbh-label govuk-label" htmlFor="addedBy">
                  Who?
                </label>
                <p className="govuk-hint" aria-describedby="addedBy">
                  Enter an email address
                </p>

                {touched['addedBy'] && errors['addedBy'] && (
                  <span className="govuk-error-message lbh-error-message govuk-!-margin-bottom-4">
                    <span className="govuk-visually-hidden">Error:</span>{' '}
                    {errors['addedBy']?.toString()}
                  </span>
                )}

                <Field
                  className="govuk-input"
                  name="addedBy"
                  type="text"
                  id="addedBy"
                  placeholder="eg. name@hackney.gov.uk"
                />
              </div>
            )}
          </div>
        </fieldset>
      </div>
    </aside>
  );
};

export default Filters;
