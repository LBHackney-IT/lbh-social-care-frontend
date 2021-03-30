import React, { useState } from 'react';
import cx from 'classnames';
import styles from './Collapsible.module.scss';
import DownArrow from 'components/Icons/DownArrow';

interface Props {
  headline: string;
  children: React.ReactChild;
  initiallyOpen?: boolean;
}

const Collapsible = ({
  headline,
  children,
  initiallyOpen = false,
}: Props): React.ReactElement => {
  const [open, setOpen] = useState(initiallyOpen);

  return (
    <div className={styles.outer}>
      <button
        onClick={() => setOpen(!open)}
        className={styles.button}
        aria-expanded={open}
      >
        <h2 className={cx(`lbh-heading-h2`, styles.headline)}>{headline}</h2>

        <DownArrow />
      </button>
      {open && children}
    </div>
  );
};

export default Collapsible;
