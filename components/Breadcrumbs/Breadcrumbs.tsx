import Link from 'next/link';
import cx from 'classnames';
import { FormStep } from 'components/Form/types';

import { renderOnCondition } from 'utils/steps';

export interface Props {
  label: string;
  link?: string;
  isCurrentStep: boolean;
}

export interface BreadcrumbProps {
  steps: FormStep[];
  data: Record<string, unknown>;
  path: string;
  currentStepIndex: number;
}

const Breadcrumb = ({
  label,
  link,
  isCurrentStep,
}: Props): React.ReactElement => {
  return (
    <li className="govuk-breadcrumbs__list-item">
      {link ? (
        <Link href={link}>
          <a className="govuk-breadcrumbs__link">{label}</a>
        </Link>
      ) : (
        <span className={cx({ 'govuk-!-font-weight-bold': isCurrentStep })}>
          {label}
        </span>
      )}
    </li>
  );
};

const Breadcrumbs = ({
  steps,
  data,
  path,
  currentStepIndex,
}: BreadcrumbProps): React.ReactElement => {
  return (
    <div className="govuk-breadcrumbs">
      <ol className="govuk-breadcrumbs__list">
        {steps.map((step, index) =>
          renderOnCondition(
            step,
            data,
            <Breadcrumb
              key={step.id}
              label={step.title}
              link={currentStepIndex > index ? `${path}${step.id}` : undefined}
              isCurrentStep={currentStepIndex === index}
            />
          )
        )}
      </ol>
    </div>
  );
};

export default Breadcrumbs;
