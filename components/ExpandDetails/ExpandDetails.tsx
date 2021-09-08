import { useState } from 'react';
import cx from 'classnames';

import styles from './ExpandDetails.module.scss';
import DownArrow from '../Icons/DownArrow';

export interface Props {
  label: string | React.ReactNode;
  children: React.ReactChild;
  triggerLabel?: string;
  buttonLabel?: boolean;
  isDefaultOpen?: boolean;
}

const ExpandDetails = ({
  label,
  triggerLabel,
  children,
  buttonLabel = false,
  isDefaultOpen = false,
}: Props): React.ReactElement => {
  const [open, setOpen] = useState<boolean>(true);
  return !buttonLabel ? (
    <details
      className="govuk-details"
      data-module="govuk-details"
      open={isDefaultOpen}
    >
      <summary className={styles.summary} onClick={() => setOpen(!open)}>
        <h3>{label}</h3>
        <span
          className={cx('govuk-link', 'govuk-link--underline', styles.trigger)}
        >
          {open ? 'Hide' : 'Show'} {triggerLabel}
        </span>
      </summary>
      <div className={styles.content}>{children}</div>
    </details>
  ) : (
    <section className="lbh-collapsible govuk-!-margin-bottom-8">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="lbh-collapsible__button"
      >
        <h2 className="lbh-heading-h2 lbh-collapsible__heading">{label}</h2>
        <DownArrow />
      </button>
      {open && <div className="lbh-collapsible__content">{children}</div>}
    </section>
  );
};

export default ExpandDetails;
