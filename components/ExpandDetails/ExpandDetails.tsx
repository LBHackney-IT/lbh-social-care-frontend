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
  isDefaultOpen = false,
}: Props): React.ReactElement => {
  const [open, setOpen] = useState<boolean>(isDefaultOpen);

  return (
    <section className="lbh-collapsible govuk-!-margin-bottom-8">
      <a
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className={`lbh-collapsible__button ${
          triggerLabel ? null : styles.noBorder
        }`}
      >
        <h2 className="lbh-heading-h2 lbh-collapsible__heading">{label}</h2>
        {triggerLabel ? (
          <span
            className={cx(
              'govuk-link',
              'govuk-link--underline',
              styles.trigger
            )}
          >
            {open ? 'Hide' : 'Show'} {triggerLabel}
          </span>
        ) : (
          <DownArrow />
        )}
      </a>
      {open && <div className="lbh-collapsible__content">{children}</div>}
    </section>
  );
};

export default ExpandDetails;
