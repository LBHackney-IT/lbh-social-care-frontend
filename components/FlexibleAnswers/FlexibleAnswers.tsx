interface RepeaterGroupAnswer {
  [key: string]: string | string[];
}

const RepeaterGroupAnswer = ({
  data,
}: {
  data: RepeaterGroupAnswer;
}): React.ReactElement => (
  <ul className="govuk-list lbh-list">
    {Object.keys(data).map((questionName) => (
      <li key={questionName}>
        <strong>{questionName}:</strong>{' '}
        {Array.isArray(data[questionName])
          ? (data[questionName] as string[]).join(', ')
          : data[questionName]}
      </li>
    ))}
  </ul>
);

const RepeaterGroupAnswers = ({
  data,
}: {
  data: (string | RepeaterGroupAnswer)[];
}): React.ReactElement => (
  <ul className="govuk-list lbh-list">
    {data.length > 1 &&
      data.map((item, i) => (
        <li key={i}>
          {typeof item === 'string' ? (
            item
          ) : (
            <RepeaterGroupAnswer data={item} />
          )}
        </li>
      ))}
  </ul>
);

interface Props {
  data: {
    // sections
    [key: string]: {
      // questions and answers
      [key: string]: string | (string | RepeaterGroupAnswer)[];
    };
  };
}

const FlexibleAnswers = ({ data }: Props): React.ReactElement => {
  return (
    <div>
      {Object.keys(data).map((stepName) => (
        <section key={stepName}>
          <h3 className="lbh-heading-h3 govuk-!-margin-top-6 govuk-!-margin-bottom-4">
            {stepName}
          </h3>
          <dl className="govuk-summary-list lbh-summary-list">
            {Object.keys(data[stepName]).map((questionName) => (
              <div className="govuk-summary-list__row" key={questionName}>
                <dt className="govuk-summary-list__key">{questionName}</dt>
                <dd className="govuk-summary-list__value">
                  {typeof data[stepName][questionName] === 'string' ? (
                    data[stepName][questionName]
                  ) : (
                    <RepeaterGroupAnswers
                      data={
                        data[stepName][questionName] as (
                          | string
                          | RepeaterGroupAnswer
                        )[]
                      }
                    />
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </div>
  );
};

export default FlexibleAnswers;
