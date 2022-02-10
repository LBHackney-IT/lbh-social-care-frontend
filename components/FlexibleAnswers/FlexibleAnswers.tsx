import { useState } from 'react';
import {
  StepAnswers,
  FlexibleAnswers as FlexibleAnswersT,
  RepeaterGroupAnswer as RepeaterGroupAnswerT,
  TimetableAnswer as TimetableAnswerT,
  Answer,
} from 'data/flexibleForms/forms.types';
import DownArrow from '../Icons/DownArrow';
import TimetableAnswer, { isTimetableAnswer } from './TimetableAnswer';
import s from './FlexibleAnswers.module.scss';

const shouldShow = (answerGroup: Answer): boolean => {
  if (Array.isArray(answerGroup)) {
    if (answerGroup.length > 0) return true;
  } else {
    if (answerGroup) return true;
  }
  return false;
};

const RepeaterGroupAnswer = ({
  answers,
}: {
  answers: RepeaterGroupAnswerT;
}): React.ReactElement => (
  <ul className="govuk-list lbh-list lbh-body-s">
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
  answers: (string | RepeaterGroupAnswerT)[];
}): React.ReactElement => (
  <ul className="govuk-list lbh-list lbh-body-s">
    {answers.length > 0 &&
      answers.map((item, i) => (
        <li key={i} className="govuk-!-margin-top-1">
          {typeof item === 'string' ? (
            item
          ) : (
            <RepeaterGroupAnswer answers={item} />
          )}
        </li>
      ))}
  </ul>
);

const SummaryList = ({
  stepAnswers,
}: {
  stepAnswers: StepAnswers;
}): React.ReactElement => (
  <dl className="govuk-summary-list lbh-summary-list">
    {Object.entries(stepAnswers).map(
      ([questionName, answerGroup]) =>
        shouldShow(answerGroup) && (
          <div className="govuk-summary-list__row" key={questionName}>
            <dt className="govuk-summary-list__key lbh-body-s">
              {questionName}
            </dt>
            <dd className={`govuk-summary-list__value lbh-body-s ${s.dd}`}>
              {typeof answerGroup === 'string' ? (
                answerGroup
              ) : isTimetableAnswer(
                  answerGroup as TimetableAnswerT | RepeaterGroupAnswerT[]
                ) ? (
                <TimetableAnswer answers={answerGroup as TimetableAnswerT} />
              ) : (
                <RepeaterGroupAnswers
                  answers={answerGroup as RepeaterGroupAnswerT[]}
                />
              )}
            </dd>
          </div>
        )
    )}
  </dl>
);

const FlexibleAnswersStep = ({
  stepName,
  stepAnswers,
}: {
  stepName: string;
  stepAnswers: StepAnswers;
}): React.ReactElement => {
  const [open, setOpen] = useState<boolean>(true);

  return (
    <section key={stepName} className="lbh-collapsible govuk-!-margin-bottom-8">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="lbh-collapsible__button"
      >
        <h2 className="lbh-heading-h4 lbh-collapsible__heading">{stepName}</h2>
        <DownArrow />
      </button>

      {open && (
        <div className="lbh-collapsible__content">
          <SummaryList stepAnswers={stepAnswers} />
        </div>
      )}
    </section>
  );
};

interface Props {
  answers: FlexibleAnswersT;
}

const FlexibleAnswers = ({ answers }: Props): React.ReactElement => {
  const steps = Object.entries(answers);

  if (steps.length === 1) return <SummaryList stepAnswers={steps[0][1]} />;

  return (
    <div>
      {steps.map(([stepName, stepAnswers]) => (
        <FlexibleAnswersStep
          key={stepName}
          stepName={stepName}
          stepAnswers={stepAnswers}
        />
      ))}
    </div>
  );
};

export default FlexibleAnswers;
