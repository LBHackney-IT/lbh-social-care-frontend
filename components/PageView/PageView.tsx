import { useEffect, useState } from 'react';
import style from './PageView.module.scss';
import Arrow from '../Icons/DownArrow';
import throttle from 'lodash/throttle';
import { HistoricCaseData } from 'types';

const PageView = ({
  title,
  officerEmail,
  formName,
  dateOfEvent,
  content,
}: HistoricCaseData): React.ReactElement => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 800) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', throttle(toggleVisibility, 1000));
  }, [window]);
  return (
    <>
      <h3 className="govuk-heading-m govuk-custom-text-color govuk-!-margin-bottom-0">
        {title.toUpperCase()}
        <hr className="govuk-divider" />
      </h3>
      <dl className="govuk-summary-list govuk-!-margin-bottom-2">
        {formName && (
          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key">{'Form name'}</dt>
            <dd className="govuk-summary-list__value">{formName}</dd>
          </div>
        )}
        {officerEmail && (
          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key">{'Created by'}</dt>
            <dd className="govuk-summary-list__value">{officerEmail}</dd>
          </div>
        )}
        {dateOfEvent && (
          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key">{'Date of event'}</dt>
            <dd className="govuk-summary-list__value">
              {new Date(dateOfEvent).toLocaleDateString('en-GB')}
            </dd>
          </div>
        )}
      </dl>
      {content && (
        <div className={style.pageView}>
          <span className={`gov-weight-lighter ${style.title}`}>Content</span>
          {isVisible && (
            <span onClick={scrollToTop} className={style.return} role="button">
              <Arrow color={'white'} />
            </span>
          )}
          <div
            className={style.content}
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          />
        </div>
      )}
    </>
  );
};
export default PageView;
