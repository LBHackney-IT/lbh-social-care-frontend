import React, { useState } from 'react';
import styles from './Collapsible.module.scss';
import DownArrow from 'components/Icons/DownArrow';

interface Props {
  headline: string;
  children: React.ReactChild;
  initiallyClosed?: boolean;
}

const Collapsible = ({
  headline,
  children,
  initiallyClosed = false,
}: Props): React.ReactElement => {
  const [open, setOpen] = useState(!initiallyClosed);

  return (
    <div className={styles.outer}>
      <button
        onClick={() => setOpen(!open)}
        className={styles.button}
        aria-expanded={open}
      >
        <h2 className="lbh-heading-h2">{headline}</h2>
        <DownArrow />
      </button>
      {open && children}
    </div>
  );
};

export default Collapsible;
