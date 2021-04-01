import React, { useState } from 'react';
import DownArrow from 'components/Icons/DownArrow';

import styles from './ExpandDetails.module.scss';

export interface Props {
  label: string;
  children: React.ReactChild;
  isDefaultOpen?: boolean;
}

const ExpandDetails = ({
  label,
  children,
  isDefaultOpen = false,
}: Props): React.ReactElement => {
  const [isOpen, setIsOpen] = useState<boolean>(isDefaultOpen);
  return (
    <div className={styles.outer}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={styles.button}
        aria-expanded={isOpen}
      >
        <h2 className="lbh-heading-h2">{label}</h2>
        <DownArrow />
      </button>
      {isOpen && children}
    </div>
  );
};

export default ExpandDetails;
