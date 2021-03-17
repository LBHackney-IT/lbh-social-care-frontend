import { useState, useMemo } from 'react';
import cx from 'classnames';
import useResizeObserver from 'use-resize-observer';
import debounce from 'lodash.debounce';

import styles from './ShowMoreBox.module.scss';

const useDebouncedResizeObserver = (wait = 500) => {
  const [size, setSize] = useState<{ width?: number; height?: number }>({});
  const onResize = useMemo(() => debounce(setSize, wait, { leading: true }), [
    wait,
  ]);
  const { ref } = useResizeObserver<HTMLDivElement>({ onResize });

  return { ref, ...size };
};

const ShowMoreBox = ({
  children,
  maxBoxWidth = 95,
}: {
  children: React.ReactElement;
  maxBoxWidth?: number;
}): React.ReactElement => {
  const [expanded, setExpanded] = useState(false);
  const { ref, height = 1 } = useDebouncedResizeObserver();
  return (
    <div>
      <div
        className={styles.container}
        style={{ maxHeight: expanded ? height : maxBoxWidth }}
      >
        <div ref={ref}>{children}</div>
      </div>
      {height > 200 && (
        <div
          className={cx('govuk-link', styles.trigger)}
          onClick={() => setExpanded(!expanded)}
          role="button"
        >
          Show {expanded ? 'less' : 'more'}
        </div>
      )}
    </div>
  );
};

export default ShowMoreBox;
