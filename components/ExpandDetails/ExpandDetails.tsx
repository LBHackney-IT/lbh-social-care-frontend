import { useState } from 'react';
import cx from 'classnames';

import styles from './ExpandDetails.module.scss';

export interface Props {
  label: string;
  triggerLabel?: string;
  children: React.ReactChild;
  isDefaultOpen?: boolean;
}

const ExpandDetails = ({
  label,
  triggerLabel,
  children,
  isDefaultOpen = false,
}: Props): React.ReactElement => {
  const [isOpen, setIsOpen] = useState<boolean>(isDefaultOpen);
  return (
    <details
      className="govuk-details"
      data-module="govuk-details"
      open={isDefaultOpen}
    >
      <summary className={styles.summary} onClick={() => setIsOpen(!isOpen)}>
        <h3>{label}</h3>
        <span
          className={cx('govuk-link', 'govuk-link--underline', styles.trigger)}
        >
          {isOpen ? 'Hide' : 'Show'} {triggerLabel}
        </span>
      </summary>
      <div className={styles.content}>{children}</div>
    </details>
  );
};

export default ExpandDetails;
