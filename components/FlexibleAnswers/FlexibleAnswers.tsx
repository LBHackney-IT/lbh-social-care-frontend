interface RepeaterGroupAnswer {
  [key: string]: string | string[];
}

const RepeaterGroupAnswer = ({
  answers,
}: {
  answers: RepeaterGroupAnswer;
}): React.ReactElement => (
  <ul className="govuk-list lbh-list">
    {Object.entries(answers).map(([questionName, answer]) => (
      <li key={questionName}>
        <strong>{questionName}:</strong>{' '}
        {Array.isArray(answer) ? answer.join(', ') : answer}
      </li>
    ))}
  </ul>
);

const RepeaterGroupAnswers = ({
  answers,
}: {
  answers: (string | RepeaterGroupAnswer)[];
}): React.ReactElement => (
  <ul className="govuk-list lbh-list">
    {answers.length > 1 &&
      answers.map((item, i) => (
        <li key={i}>
          {typeof item === 'string' ? (
            item
          ) : (
            <RepeaterGroupAnswer answers={item} />
          )}
        </li>
      ))}
  </ul>
);

interface Props {
  answers: {
    // sections
    [key: string]: {
      // questions and answers
      [key: string]: string | (string | RepeaterGroupAnswer)[];
    };
  };
}

const FlexibleAnswers = ({ answers }: Props): React.ReactElement => {
  return (
    <div>
      {Object.entries(answers).map(([stepName, stepAnswers]) => (
        <section key={stepName}>
          <h2 className="lbh-heading-h2 govuk-!-margin-top-7 govuk-!-margin-bottom-4">
            {stepName}
          </h2>

          <dl className="govuk-summary-list lbh-summary-list">
            {Object.entries(stepAnswers).map(([questionName, answerGroup]) => (
              <div className="govuk-summary-list__row" key={questionName}>
                <dt className="govuk-summary-list__key">{questionName}</dt>
                <dd className="govuk-summary-list__value">
                  {typeof answerGroup === 'string' ? (
                    answerGroup
                  ) : (
                    <RepeaterGroupAnswers answers={answerGroup} />
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
