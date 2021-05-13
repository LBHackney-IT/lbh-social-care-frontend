import { useState } from 'react';
import { truncate } from '../../lib/utils';
import s from './ShowMoreBox.module.scss';

interface Props {
  children: string;
}

const ShowMoreBox = ({ children }: Props): React.ReactElement => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const wordLimit = 20;

  return (
    <div>
      {children.split(' ').length > wordLimit ? (
        <>
          {expanded ? children : truncate(children, wordLimit)}
          <button
            className={`govuk-link lbh-link ${s.button}`}
            aria-expanded={expanded ? 'true' : 'false'}
            onClick={() => setExpanded(!expanded)}
          >
            <svg width="17" height="10" viewBox="0 0 19 12" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.0606 11.182L0 2.12128L2.1213 0L9.0606 6.93938L16 0L18.1213 2.12128L9.0606 11.182Z"
                fill="#1d70b8"
              />
            </svg>

            {expanded ? 'Show less' : 'Show more'}
          </button>
        </>
      ) : (
        children
      )}
    </div>
  );
};

export default ShowMoreBox;
