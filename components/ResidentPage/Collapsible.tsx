import useLocalStorage from 'hooks/useLocalStorage';
import React from 'react';
import s from './Collapsible.module.scss';

interface Props {
  title: string;
  children: React.ReactChild | React.ReactChild[];
  link?: React.ReactChild;
  aside?: React.ReactElement;
}
const Collapsible = ({
  title,
  children,
  link,
  aside,
}: Props): React.ReactElement => {
  const [open, setOpen] = useLocalStorage<boolean>(title.toLowerCase(), true);

  return (
    <section className={s.outer}>
      <header className={s.header}>
        <button onClick={() => setOpen(!open)} aria-expanded={open}>
          <svg viewBox="0 0 284 284">
            <g>
              <path
                fill="#0b0c0c"
                d="M282.082,76.511l-14.274-14.273c-1.902-1.906-4.093-2.856-6.57-2.856c-2.471,0-4.661,0.95-6.563,2.856L142.466,174.441
L30.262,62.241c-1.903-1.906-4.093-2.856-6.567-2.856c-2.475,0-4.665,0.95-6.567,2.856L2.856,76.515C0.95,78.417,0,80.607,0,83.082
c0,2.473,0.953,4.663,2.856,6.565l133.043,133.046c1.902,1.903,4.093,2.854,6.567,2.854s4.661-0.951,6.562-2.854L282.082,89.647
c1.902-1.903,2.847-4.093,2.847-6.565C284.929,80.607,283.984,78.417,282.082,76.511z"
              />
            </g>
          </svg>

          <h2 className="lbh-heading-h4">{title}</h2>
        </button>

        {link}
      </header>

      {open && (
        <>
          {aside ? (
            <div className="govuk-grid-row govuk-!-margin-top-2">
              <div className="govuk-grid-column-one-half">{children}</div>
              <aside className="govuk-grid-column-one-half">{aside}</aside>
            </div>
          ) : (
            children
          )}
        </>
      )}
    </section>
  );
};

export default Collapsible;

export const CollapsibleSkeleton = ({
  children,
}: {
  children: React.ReactChild | React.ReactChild[];
}): React.ReactElement => (
  <div aria-label="Loading..." className={s.skeleton}>
    <div>
      <div></div>
      <div></div>
    </div>
    {children}
  </div>
);
